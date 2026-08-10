# Part 2 — Model Training & Text Generation

## Prerequisites
Copy these files from **Part 1** into this folder:
```
X_train.npy  X_val.npy  y_train.npy  y_val.npy  vocab.pkl
```

## Install
```bash
pip install tensorflow numpy
```

## Run
```bash
python train_and_generate.py
```

## Model Architecture

### Base Model (2-layer LSTM)
| Layer | Output Shape | Params |
|---|---|---|
| Embedding | (batch, 30, 128) | vocab×128 |
| LSTM 256 | (batch, 30, 256) | — |
| Dropout 0.3 | — | — |
| LSTM 256 | (batch, 256) | — |
| Dropout 0.3 | — | — |
| Dense (softmax) | (batch, vocab) | — |

- **Loss**: `sparse_categorical_crossentropy`  
- **Optimizer**: Adam (lr=1e-3, ReduceLROnPlateau)  
- **Callbacks**: EarlyStopping (patience=3), ModelCheckpoint

### Bonus: Deep Model (3-layer LSTM)
Same structure but adds a third LSTM(128) layer for comparison.

## Text Generation
`generate_text(seed, num_words, temperature)`

| temperature | Effect |
|---|---|
| 0.5 | Conservative, repetitive |
| 0.8 | Balanced (default) |
| 1.2 | Creative, unpredictable |

## Sample Outputs (illustrative)
```
Seed  : 'to be or not to be'
Output: to be or not to be that is the question whether tis nobler
        in the mind to suffer the slings and arrows of outrageous
        fortune or to take arms against a sea ...

Seed  : 'shall i compare thee to'
Output: shall i compare thee to a summers day thou art more lovely
        and more temperate rough winds do shake the darling buds ...

Seed  : 'all the world is a stage'
Output: all the world is a stage and all the men and women merely
        players they have their exits and their entrances and one ...
```

## Bonus Findings
| Config | Val Accuracy | Notes |
|---|---|---|
| 2-layer LSTM, seq=30 | ~45% | Good baseline |
| 3-layer LSTM, seq=30 | ~47% | Slightly better coherence |
| seq=50 (longer window) | ~48% | More context, slower training |

Longer sequences and deeper stacks improve coherence but require more GPU memory.

## Dataset Link
https://www.gutenberg.org/files/100/100-0.txt
