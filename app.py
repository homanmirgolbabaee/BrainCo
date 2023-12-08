from flask import Flask, render_template, request, session , redirect, url_for, flash
import openai
from pymilvus import MilvusClient, FieldSchema, CollectionSchema, DataType, Collection, connections
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import os
from sentiment_detector import sentiment_detection
load_dotenv("credentials.env")
app = Flask(__name__, static_folder='my-app/out', static_url_path='')


app.secret_key = 'your_secret_key'  # Replace with a real secret key for production
openai_key =os.getenv("OPENAI_KEY")
# Set up the OpenAI client
openai.api_key = openai_key  # Replace with your OpenAI API key

# Setting Zillit
zillit_api_key = "ee6baeab155f0227138069ff86218a934e7ad444fdef032138bab7b3bc3c74236ae04c0f8a8bc15de3204aae4ab83c75411f3ac7"  # Replace with your Zillit API key
zillit_cluster_url = "https://in03-a6858cbb50dcc2b.api.gcp-us-west1.zillizcloud.com"  # Replace with your Zillit cluster URL

# Initialize Zillit Client
zillit_client = MilvusClient(
    uri=zillit_cluster_url,
    token=zillit_api_key
)

def initializing_zillit():
    connections.connect(
        alias='default',
        uri=zillit_cluster_url,
        token=zillit_api_key
    )
    print("Proceeding to Zillit Connection ...")

def create_collection():
    fields = [
        FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
        FieldSchema(name="user_message", dtype=DataType.VARCHAR, max_length=2048),   
        FieldSchema(name="bot_response", dtype=DataType.VARCHAR, max_length=2048),
        FieldSchema(name="title_vector", dtype=DataType.FLOAT_VECTOR, dim=384)
    ]
    schema = CollectionSchema(
        fields,
        description="Schema of Conversations",
        enable_dynamic_field=False
    )
    collection = Collection(
        name="lablab2",
        description="Conversations",
        schema=schema
    )
    print("Schema 2 Proceeded ...")


def create_users_collection():
    fields = [
        FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
        FieldSchema(name="username", dtype=DataType.VARCHAR, max_length=2048),   
        FieldSchema(name="password", dtype=DataType.VARCHAR, max_length=2048),
        FieldSchema(name="title_vector", dtype=DataType.FLOAT_VECTOR, dim=384)
    ]
    schema = CollectionSchema(
        fields,
        description="Schema of Users",
        enable_dynamic_field=False
    )
    collection = Collection(
        name="users",
        description="user details",
        schema=schema
    )
    print("Schema 3 Proceeded ...")
    
    
initializing_zillit()
#create_collection()
#create_users_collection()

# Index Parameters
index_params = {
    "index_type": "AUTOINDEX",
    "metric_type": "L2",
    "params": {}
}

def create_index(collection_name):
    collection = Collection(name=collection_name)
    collection.create_index(
        field_name="title_vector",
        index_params=index_params,
        index_name='title_vector_index'
    )
    print("Index created on collection:", collection_name)

##create_index("lablab2")
##create_index("users")
# Initialize the sentence transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

def generate_embedding(text):
    embedding = model.encode(text)
    return embedding.tolist()

def store_conversation(user_message, bot_response):
    conversation_id = session.get('conversation_id', 0) + 1
    session['conversation_id'] = conversation_id

    try:
        embedding = generate_embedding(user_message)
        zillit_client.insert(
            collection_name="lablab2",
            data={
                'id': conversation_id,
                'user_message': user_message,
                'bot_response': bot_response,
                'title_vector': embedding
            }
        )
    except Exception as e:
        print(f"Error storing conversation: {e}")

def input_sample_users(id,username, password):
    try: 
        embedding = generate_embedding(username)
        zillit_client.insert(
            collection_name="users",
            data={
                'id': id,
                'username': username,
                'password': password,
                'title_vector': embedding
            }
        )
        print("User stored")
    except Exception as e:
        print(f"Error storing conversation: {e}")
        
input_sample_users(1,"homan","1234")
print(zillit_client.list_collections())

username = "homan"
password = "1234"
#print(generate_embedding("homan"))


def login_function():
    username = input("Enter your username: ")
    # Generate the embedding for the username
    username_vector = generate_embedding(username)
    #print(username_vector)
    
    try:
        # Search for the user in the Zilliz database
        search_results = zillit_client.search(
            collection_name="users",
            data=[username_vector],
            limit=1,  # Assuming you want the closest match
            output_fields=["id", "title_vector"]
        )

        # Check if the search_results list is not empty
        if search_results:
            # Access the first result
            first_result = search_results[0]
            print("-------------- Search Result ------------")
            print(first_result)
            distance_value = first_result[0]['distance']
            print(distance_value)
            print("------ ------ ------ ------ ------ ------")
            # when user is verified through the distance value 
            if(int(distance_value) == 0):
                print("***USER FOUND ***")
                print("Logging in ... ")
                print("Welcome " + username + " to BrainCo 🧠")
                print("[🧠] You can now chat with our bot  ")
                sentiment_detection()

    except ValueError as e:
        # Handle case where the collection does not exist or other search errors
        return str(e), 500
    



#login functionality 

def query_gpt4(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"An error occurred: {e}")
        return None





@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file(path) if path else app.send_static_file('index.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # Generate the embedding for the username
    username_vector = generate_embedding(username)

    try:
        # Search for the user in the Zilliz database
        search_results = zillit_client.search(
            collection_name="users",
            data=[username_vector],
            limit=1,  # Assuming you want the closest match
            output_fields=["id", "password"]
        )

        # Check if a close enough match is found
        if search_results and search_results[0]['distance'] < 1:
            user_id = search_results[0]['id']
            stored_password = search_results[0]['password']

            # Compare the provided password with the stored one
            if password == stored_password:
                # Handle successful login, e.g., create session
                return "Login successful", 200
            else:
                return "Invalid username or password", 401
        else:
            return "Invalid username or password", 401
    except ValueError as e:
        # Handle case where the collection does not exist or other search errors
        return str(e), 500
    
    
if __name__ == '__main__':
    login_function()
    app.run(debug=True)
