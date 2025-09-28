import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import joblib
import os

def train_and_save_model():
   
    data_path = "datasets/spam.csv"
    df = pd.read_csv(data_path, encoding="latin-1")

    
    df = df.rename(columns={"v1": "label", "v2": "message"})
    df = df[["label", "message"]]

   
    df["label"] = df["label"].map({"ham": 0, "spam": 1})

   
    X_train, X_test, y_train, y_test = train_test_split(
        df["message"], df["label"], test_size=0.2, random_state=42
    )

  
    model = make_pipeline(TfidfVectorizer(), MultinomialNB())

   
    model.fit(X_train, y_train)

 
    accuracy = model.score(X_test, y_test)
    print(f"Model accuracy: {accuracy:.2f}")

  
    os.makedirs("models", exist_ok=True)


    joblib.dump(model, "models/fraud_model.pkl")
    print(" Model saved as models/fraud_model.pkl")

if __name__ == "__main__":
    train_and_save_model()
