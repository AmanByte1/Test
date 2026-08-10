# Part 1 — Data Preprocessing

## Dataset
Shakespeare's Complete Works — Project Gutenberg  
URL: https://www.gutenberg.org/files/100/100-0.txt  
(Script auto-downloads it on first run)

## Steps performed
1. Download raw `.txt` file
2. Lowercase + strip punctuation
3. Tokenize into words
4. Build `word→index` vocabulary
5. Slide a window of `SEQ_LEN=30` words to create (X, y) pairs
6. 90/10 train-validation split
7. Save `.npy` arrays + `vocab.pkl`

## Run
```bash
pip install numpy
python preprocess.py
```

## Outputs (copy to part2)
| File | Description |
|---|---|
| `X_train.npy` | Training input sequences |
| `X_val.npy` | Validation input sequences |
| `y_train.npy` | Training labels (next word index) |
| `y_val.npy` | Validation labels |
| `vocab.pkl` | word2idx / idx2word / vocab_size / seq_len |
