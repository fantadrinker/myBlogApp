---

title: 'llm from scratch learning notes'

date: '2025-10-12'

---

### Traning process

- Pretrain LLM - this creates an LLM with some basic capabilities like few shot 
capabilities and text completion
- unlike traditional deep learning models, data fed to pretrain LLMs does not 
need to be labeled

- Example of transformer model used for translation. 
Key is to convert input text to embeddings (Encoder) that can be fed to output layer
(Decoder) to generate the next word
- LLMs are not limited to text completion, but also can fill in blanks (BERT)
