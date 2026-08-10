"""
PART 1 - Data Preprocessing for LSTM Text Generation
Dataset: Shakespeare's Complete Works
Source: https://www.gutenberg.org/files/100/100-0.txt
"""

import os
import re
import pickle
import numpy as np
import urllib.request

# ── 1. Download Dataset ──────────────────────────────────────────────────────
URL = "https://www.gutenberg.org/files/100/100-0.txt"
RAW_FILE = "shakespeare.txt"

if not os.path.exists(RAW_FILE):
    print("Downloading Shakespeare dataset...")
    urllib.request.urlretrieve(URL, RAW_FILE)
    print("Download complete.")

with open(RAW_FILE, "r", encoding="utf-8-sig", errors="ignore") as f:
    raw_text = f.read()

# ── 2. Clean Text ────────────────────────────────────────────────────────────
# Lowercase + remove punctuation, keep only letters and spaces
text = raw_text.lower()
text = re.sub(r"[^a-z\s]", "", text)
text = re.sub(r"\s+", " ", text).strip()

print(f"Total characters after cleaning: {len(text):,}")

# ── 3. Tokenize into words ───────────────────────────────────────────────────
words = text.split()
print(f"Total words: {len(words):,}")

# Vocabulary
vocab = sorted(set(words))
vocab_size = len(vocab)
print(f"Vocabulary size: {vocab_size:,}")

word2idx = {w: i for i, w in enumerate(vocab)}
idx2word = {i: w for w, i in word2idx.items()}

# ── 4. Create Input-Output Sequences ────────────────────────────────────────
SEQ_LEN = 30  # number of input tokens per sample

# Encode full text as integer indices
encoded = [word2idx[w] for w in words]

X, y = [], []
for i in range(len(encoded) - SEQ_LEN):
    X.append(encoded[i : i + SEQ_LEN])
    y.append(encoded[i + SEQ_LEN])

X = np.array(X, dtype=np.int32)
y = np.array(y, dtype=np.int32)

print(f"Sequences (X): {X.shape}")
print(f"Labels    (y): {y.shape}")

# ── 5. Train / Validation Split ──────────────────────────────────────────────
split = int(0.9 * len(X))
X_train, X_val = X[:split], X[split:]
y_train, y_val = y[:split], y[split:]

print(f"Train samples : {len(X_train):,}")
print(f"Val   samples : {len(X_val):,}")

# ── 6. Save Artifacts ────────────────────────────────────────────────────────
np.save("X_train.npy", X_train)
np.save("X_val.npy",   X_val)
np.save("y_train.npy", y_train)
np.save("y_val.npy",   y_val)

with open("vocab.pkl", "wb") as f:
    pickle.dump({"word2idx": word2idx, "idx2word": idx2word,
                 "vocab_size": vocab_size, "seq_len": SEQ_LEN}, f)

print("\nSaved: X_train.npy, X_val.npy, y_train.npy, y_val.npy, vocab.pkl")
print("Preprocessing complete. Copy these files to part2 before training.")
