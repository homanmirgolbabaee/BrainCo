from dotenv import load_dotenv
import os
from pymilvus import MilvusClient ,FieldSchema, CollectionSchema, DataType, Collection, connections
from datetime import datetime
from sentence_transformers import SentenceTransformer


load_dotenv('credentials.env')  # replace with your .env file name

zilliz_api_key = os.getenv('zilliz_api_key')
zilliz_cluster_url = os.getenv('zilliz_cluster_url')

if zilliz_api_key is not None:
    print(f"zilliz_api_key: {zilliz_api_key}")
else:
    print("zilliz_api_key is not set")

if zilliz_cluster_url is not None:
    print(f"zilliz_cluster_url: {zilliz_cluster_url}")
else:
    print("zilliz_cluster_url is not set")


# Initialize Zillit Client
zillit_client = MilvusClient(
uri = zilliz_cluster_url,
token =zilliz_api_key
)

def initliazing_zilliz():
    connections.connect(
        alias='default',
        uri=zilliz_cluster_url,
        token =zilliz_api_key
    )
    print("Proceeding to Zilliz Connection ...")
    
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
    name="BrainUsers", 
    description="Convesations",
    schema=schema
    )
    print("[🧠Users] Schema Proceeded ...")
    
# Index Parameters
index_params = {
    "index_type": "AUTOINDEX",
    "metric_type": "L2",  # L2 distance is a common choice
    "params": {}
}    

def create_index(collection_name):
    # Retrieve the collection
    collection = Collection(name=collection_name)

    # Create index on the vector field
    collection.create_index(
        field_name="title_vector",
        index_params=index_params,
        index_name='title_vector_index'
    )
    print("Index created on collection:", collection_name)

# After creating the collection
create_index("lablab2")


# Initialize the sentence transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

def generate_embedding(text):
    # Generate embedding
    embedding = model.encode(text)
    return embedding.tolist()  # Convert numpy array to list