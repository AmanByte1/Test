"""
PART 2 - LSTM Model Training & Text Generation
Requires output files from Part 1 to be present in this directory.
"""

import os
import pickle
import random
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, callbacks

# ── 1. Load preprocessed data ────────────────────────────────────────────────
X_train = np.load("X_train.npy")
X_val   = np.load("X_val.npy")
y_train = np.load("y_train.npy")
y_val   = np.load("y_val.npy")

with open("vocab.pkl", "rb") as f:
    vocab = pickle.load(f)

word2idx  = vocab["word2idx"]
idx2word  = vocab["idx2word"]
VOCAB_SIZE = vocab["vocab_size"]
SEQ_LEN   = vocab["seq_len"]

print(f"Vocab size : {VOCAB_SIZE:,}")
print(f"Seq length : {SEQ_LEN}")
print(f"Train size : {len(X_train):,}")

# ── 2. One-hot encode labels ─────────────────────────────────────────────────
# Use sparse_categorical_crossentropy → labels stay as integers (no one-hot needed)

# ── 3. Build LSTM Model ──────────────────────────────────────────────────────
EMBED_DIM = 128
LSTM_UNITS = 256

def build_model(vocab_size, seq_len, embed_dim, lstm_units):
    model = tf.keras.Sequential([
        layers.Embedding(vocab_size, embed_dim, input_length=seq_len),
        layers.LSTM(lstm_units, return_sequences=True),
        layers.Dropout(0.3),
        layers.LSTM(lstm_units),
        layers.Dropout(0.3),
        layers.Dense(vocab_size, activation="softmax"),
    ])
    model.compile(
        loss="sparse_categorical_crossentropy",
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        metrics=["accuracy"],
    )
    return model

model = build_model(VOCAB_SIZE, SEQ_LEN, EMBED_DIM, LSTM_UNITS)
model.summary()

# ── 4. Callbacks ─────────────────────────────────────────────────────────────
cb_list = [
    callbacks.EarlyStopping(monitor="val_loss", patience=3, restore_best_weights=True),
    callbacks.ModelCheckpoint("best_model.keras", save_best_only=True, monitor="val_loss"),
    callbacks.ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=2, verbose=1),
]

# ── 5. Train ─────────────────────────────────────────────────────────────────
BATCH_SIZE = 256
EPOCHS     = 20

history = model.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    batch_size=BATCH_SIZE,
    epochs=EPOCHS,
    callbacks=cb_list,
)

# ── 6. Text Generation ───────────────────────────────────────────────────────
def generate_text(seed_text: str, num_words: int = 50, temperature: float = 0.8) -> str:
    """
    Generate text from a seed phrase.

    temperature < 1  → more conservative / repetitive
    temperature > 1  → more creative / random
    """
    seed_words = seed_text.lower().split()
    # Encode seed; unknown words mapped to index 0
    sequence = [word2idx.get(w, 0) for w in seed_words]

    # Pad / trim to SEQ_LEN
    if len(sequence) < SEQ_LEN:
        sequence = [0] * (SEQ_LEN - len(sequence)) + sequence
    else:
        sequence = sequence[-SEQ_LEN:]

    generated = list(seed_words)

    for _ in range(num_words):
        x = np.array(sequence[-SEQ_LEN:]).reshape(1, SEQ_LEN)
        preds = model.predict(x, verbose=0)[0]  # shape: (vocab_size,)

        # Apply temperature scaling
        preds = np.log(preds + 1e-8) / temperature
        preds = np.exp(preds) / np.sum(np.exp(preds))

        next_idx = np.random.choice(len(preds), p=preds)
        generated.append(idx2word[next_idx])
        sequence.append(next_idx)

    return " ".join(generated)


# ── 7. Sample Outputs ────────────────────────────────────────────────────────
seeds = [
    "to be or not to be",
    "shall i compare thee to",
    "all the world is a stage",
]

print("\n" + "=" * 60)
print("GENERATED TEXT SAMPLES")
print("=" * 60)

for seed in seeds:
    print(f"\nSeed  : '{seed}'")
    print(f"Output: {generate_text(seed, num_words=50, temperature=0.8)}\n")
    print("-" * 60)


# ── 8. Bonus: Experiment with deeper architecture ────────────────────────────
print("\nBonus experiment — 3-layer LSTM")

def build_deep_model(vocab_size, seq_len, embed_dim=128, lstm_units=256):
    model = tf.keras.Sequential([
        layers.Embedding(vocab_size, embed_dim, input_length=seq_len),
        layers.LSTM(lstm_units, return_sequences=True),
        layers.Dropout(0.3),
        layers.LSTM(lstm_units, return_sequences=True),
        layers.Dropout(0.3),
        layers.LSTM(lstm_units // 2),
        layers.Dropout(0.3),
        layers.Dense(vocab_size, activation="softmax"),
    ])
    model.compile(
        loss="sparse_categorical_crossentropy",
        optimizer=tf.keras.optimizers.Adam(1e-3),
        metrics=["accuracy"],
    )
    return model

deep_model = build_deep_model(VOCAB_SIZE, SEQ_LEN)
deep_model.summary()
# Train for fewer epochs to compare quickly
deep_model.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    batch_size=BATCH_SIZE,
    epochs=5,
    callbacks=[callbacks.EarlyStopping(patience=2, restore_best_weights=True)],
)

print("\nDeep model output:")
print(generate_text("to be or not to be", num_words=50, temperature=0.8))
