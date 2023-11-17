import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules
from mlxtend.preprocessing import TransactionEncoder
from flask import Flask, request, render_template, jsonify, url_for
from flask_cors import CORS 
import json
import qrcode
app = Flask(__name__)
CORS(app)

# Sample data
with open('orders.json') as f:
    data = json.load(f)['orders']

# Create a list of transactions
def generate_transactions(data):
    transactions = []
    for order in data:
        transaction = set()
        for item in order['items']:
            transaction.add(item['title'])
        transactions.append(transaction)
    return transactions

# Function to update association rules based on new data
def update_rules(data):
    transactions = generate_transactions(data)
    
    # Convert the transactions to a binary DataFrame
    te = TransactionEncoder()
    te_ary = te.fit(transactions).transform(transactions)
    df = pd.DataFrame(te_ary, columns=te.columns_)

    # Find frequent itemsets and select min support (unchanged)
    frequent_itemsets = apriori(df, min_support=0.2, use_colnames=True)

    # Find association rules (unchanged)
    rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1.0)

    return rules

# Initial rules based on the sample data
rules = update_rules(data)

# Function to get item details from the orders
def get_item_details(item_id):
    for order in data:
        for item in order['items']:
            if item['title'] == item_id:
                return item

# Flask routes for recommendation
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/recommend', methods=['GET', 'POST'])
def get_recommendations():
    global rules  # Use the global rules variable

    if request.method == 'POST':
        try:
            user_input = request.json.get('items')  # Note the change to 'items'
            if not user_input or len(user_input) == 0:
                return jsonify({"message": "Please provide 'items' in the request payload."}), 400

            recommendations = []
            user_rules = rules[rules['antecedents'] == frozenset(user_input)]
            if not user_rules.empty:
                user_recommendations = user_rules.sort_values(by='lift', ascending=False)
                for idx, row in user_recommendations.iterrows():
                    recommendation = list(row['consequents'])[0]
                    lift = row['lift']
                    item_details = get_item_details(recommendation)
                    recommendations.append({'item': recommendation, 'lift': lift, 'details': item_details})
                recommendations.sort(key=lambda x: x['lift'], reverse=True)
                top_recommendations = recommendations[:5]
                response = {"message": f"Top 5 recommendations for {user_input}:", "recommendations": top_recommendations}
                return jsonify(response), 200

            return jsonify({"message": "No recommendations found."}), 404

        except Exception as e:
            response = {"message": "Error: " + str(e)}
            return jsonify(response), 500
    elif request.method == 'GET':
        items = request.args.getlist('items')  # Note the change to 'items'
        # items will be a list of items
        # example http://localhost:8085/recommend?items=Burger&items=French Fries
        if items:
            recommendations = []
            user_rules = rules[rules['antecedents'] == frozenset(items)]
            if not user_rules.empty:
                user_recommendations = user_rules.sort_values(by='lift', ascending=False)
                for idx, row in user_recommendations.iterrows():
                    recommendation = list(row['consequents'])[0]
                    lift = row['lift']
                    item_details = get_item_details(recommendation)
                    recommendations.append({'item': recommendation, 'lift': lift, 'details': item_details})
                recommendations.sort(key=lambda x: x['lift'], reverse=True)
                top_recommendations = recommendations[:5]
                response = {"message": f"Recommendations for {items}:", "recommendations": top_recommendations}
                return jsonify(response), 200

            return jsonify({"message": "No recommendations found."}), 404
        else:
            return jsonify({"message": "Please provide an 'items' query parameter for recommendations."}), 400
        
@app.route('/generate_qr/<table_number>')
def generate_qr(table_number):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )

    # Generate QR code data as a URL that links to the menu page for the given table_number
    qr_data = f'http://localhost:3000/explore/{table_number}'
    qr.add_data(qr_data)
    qr.make(fit=True)

    # Create an image of the QR code
    qr_image = qr.make_image(fill_color="black", back_color="white")

    # Save the QR code image to C:\Users\vivek codes\Documents\GitHub\Secure-Table\client\src\assets\tableQrCodes
    qr_image.save(f'../../client/src/assets/tableQrCodes/qr_{table_number}.png')
    # Serve the saved QR code image
    return "QR code generated successfully",200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8085)
    
# do not use 'item' :- http://127.0.0.1:8085/recommend?item=Burger 

# instead use like this:- http://localhost:8085/recommend?items=Burger&items=Pizza

# http://192.168.26.37:8085/genereate_qr/1

# if there are multiple orders 