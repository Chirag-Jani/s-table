# import pandas as pd
# from mlxtend.frequent_patterns import apriori
# from mlxtend.frequent_patterns import association_rules
# from mlxtend.preprocessing import TransactionEncoder
# from flask import Flask, request, render_template, jsonify
# from flask_cors import CORS 

# app = Flask(__name__)
# CORS(app)
# # razorpay_client = razorpay.Client(auth=("rzp_test_x6gwd2RFp6bql6", "OBfP8ggUdJSQmsF1QMlJOO1q"))
# # RAZORPAY_API_KEY = "rzp_test_x6gwd2RFp6bql6"
# # RAZORPAY_API_SECRET = "OBfP8ggUdJSQmsF1QMlJOO1q"

# # Sample data
# data = [
#     {'table_number': '1', 'order': {'dosa': {'qty': 2, 'subtotal': 80}, 'idli': {'qty': 2, 'subtotal': 60}}, 'total_price': 140, 'total_quantity': 4, 'total_subtotal': 147.0, 'timestamp': '2023-11-03 09:07:41'},
#     {'table_number': '1', 'order': {'dosa': {'qty': 2, 'subtotal': 80}, 'idli': {'qty': 2, 'subtotal': 60}}, 'total_price': 140, 'total_quantity': 4, 'total_subtotal': 147.0, 'timestamp': '2023-11-03 09:07:41'},
#     {'table_number': '1', 'order': {'dosa': {'qty': 2, 'subtotal': 80}, 'idli': {'qty': 2, 'subtotal': 60}}, 'total_price': 140, 'total_quantity': 4, 'total_subtotal': 147.0, 'timestamp': '2023-11-03 09:07:41'},
#     {'table_number': '1', 'order': {'dosa': {'qty': 2, 'subtotal': 80}, 'idli': {'qty': 2, 'subtotal': 60}}, 'total_price': 140, 'total_quantity': 4, 'total_subtotal': 147.0, 'timestamp': '2023-11-03 09:07:41'},
#     {'table_number': '1', 'order': {'panipuri': {'qty': 1, 'subtotal': 30}}, 'total_price': 30, 'total_quantity': 1, 'total_subtotal': 31.5, 'timestamp': '2023-11-03 09:09:03'},
#     {'table_number': '2', 'order': {'burger': {'qty': 1, 'subtotal': 50}, 'pizza': {'qty': 1, 'subtotal': 100}}, 'total_price': 150, 'total_quantity': 2, 'total_subtotal': 157.5, 'timestamp': '2023-11-03 09:09:58'},
#     {'table_number': '1', 'order': {'burger': {'qty': 3, 'subtotal': 150}, 'pizza': {'qty': 1, 'subtotal': 100}}, 'total_price': 250, 'total_quantity': 4, 'total_subtotal': 262.5, 'timestamp': '2023-11-03 09:10:58'},
#     {'table_number': '3', 'order': {'burger': {'qty': 7, 'subtotal': 350}, 'pizza': {'qty': 2, 'subtotal': 200}}, 'total_price': 550, 'total_quantity': 9, 'total_subtotal': 577.5, 'timestamp': '2023-11-03 09:11:46'},
#     {'table_number': '3', 'order': {'burger': {'qty': 7, 'subtotal': 350}, 'panipuri': {'qty': 2, 'subtotal': 200}}, 'total_price': 550, 'total_quantity': 9, 'total_subtotal': 577.5, 'timestamp': '2023-11-03 09:11:46'},
#     {'table_number': '3', 'order': {'panipuri': {'qty': 7, 'subtotal': 350}, 'pizza': {'qty': 2, 'subtotal': 200}}, 'total_price': 550, 'total_quantity': 9, 'total_subtotal': 577.5, 'timestamp': '2023-11-03 09:11:46'},
#     {'table_number': '3', 'order': {'panipuri': {'qty': 7, 'subtotal': 350}, 'pizza': {'qty': 2, 'subtotal': 200}}, 'total_price': 550, 'total_quantity': 9, 'total_subtotal': 577.5, 'timestamp': '2023-11-03 09:11:46'},
#     {'table_number': '3', 'order': {'panipuri': {'qty': 7, 'subtotal': 350}, 'pizza': {'qty': 2, 'subtotal': 200}}, 'total_price': 550, 'total_quantity': 9, 'total_subtotal': 577.5, 'timestamp': '2023-11-03 09:11:46'}
# ]
# # Create a list of transactions
# transactions = []
# for entry in data:
#     transaction = set()
#     for item, details in entry['order'].items():
#         transaction.add(item)
#     transactions.append(transaction)

# # Convert the transactions to a binary DataFrame
# te = TransactionEncoder()
# te_ary = te.fit(transactions).transform(transactions)
# df = pd.DataFrame(te_ary, columns=te.columns_)

# # Find frequent itemsets and select min support (unchanged)
# frequent_itemsets = apriori(df, min_support=0.2, use_colnames=True)

# # Find association rules (unchanged)
# rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1.0)

# # Flask routes for recommendation (unchanged)
# @app.route('/')
# def home():
#     return render_template('index.html')

# @app.route('/recommend', methods=['GET', 'POST'])
# def get_recommendations():
#     if request.method == 'POST':
#         try:
#             user_input = request.json.get('item')
#             recommendations = []
#             user_rules = rules[rules['antecedents'] == frozenset({user_input})]
#             if not user_rules.empty:
#                 user_recommendations = user_rules.sort_values(by='lift', ascending=False)
#                 for idx, row in user_recommendations.iterrows():
#                     recommendation = list(row['consequents'])[0]
#                     lift = row['lift']
#                     recommendations.append({'item': recommendation, 'lift': lift})
#                 recommendations.sort(key=lambda x: x['lift'], reverse=True)
#                 top_recommendations = recommendations[:5]
#                 response = {"message": f"Top 5 recommendations for {user_input}:", "recommendations": top_recommendations}
#                 return jsonify(response), 200

#         except Exception as e:
#             response = {"message": "Error: " + str(e)}
#             return jsonify(response), 500
#     elif request.method == 'GET':
#         item = request.args.get('item')
#         if item:
#             recommendations = []
#             user_rules = rules[rules['antecedents'] == frozenset({item})]
#             if not user_rules.empty:
#                 user_recommendations = user_rules.sort_values(by='lift', ascending=False)
#                 for idx, row in user_recommendations.iterrows():
#                     recommendation = list(row['consequents'])[0]
#                     lift = row['lift']
#                     recommendations.append({'item': recommendation, 'lift': lift})
#                 recommendations.sort(key=lambda x: x['lift'], reverse=True)
#                 top_recommendations = recommendations[:5]
#                 response = {"message": f"Recommendations for {item}:", "recommendations": top_recommendations}
#                 return jsonify(response), 200
#         else:
#             return "Please provide an 'item' query parameter for recommendations."

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=8085)