import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import joblib
import os


data_path = "datasets/email.csv"  


df = pd.read_csv(data_path)


df = df.rename(columns={"Category": "label", "Message": "message"})
df = df[["label", "message"]]


df = df.dropna()


if df["label"].dtype == object:  
    df["label"] = df["label"].map({"ham": 0, "spam": 1})


X_train, X_test, y_train, y_test = train_test_split(
    df["message"], df["label"], test_size=0.2, random_state=42
)


model = make_pipeline(TfidfVectorizer(), MultinomialNB())


model.fit(X_train, y_train)


accuracy = model.score(X_test, y_test)
print(f"📧 Email Model Accuracy: {accuracy:.2f}")

os.makedirs("models", exist_ok=True)


joblib.dump(model, "models/fraud_email_model.pkl")
print(" Model saved as models/fraud_email_model.pkl")
