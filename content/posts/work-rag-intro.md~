+++
title = "Introduction to RAG training"
date = 2026-06-22
draft = true
tags = ["rag", "ai"]
+++  

## References  
- [Datacamp: What is RAG?][datacamp_rag]  
- [IBM RAG][ibm_rag]
- [Snowflake Rag][matillion_blog]


## Topics  
 

### RAG  

**Retrieval-Augmented-Generation**

The problem being solved is that LLMs only have the knowledge from the 
data they were trained on. They don't know things like information from 
a company's internal documents. RAG is a way to provide the missing 
formation to the LLM so that it can generate an infromed response.  

- **Retrieve**: when a user sasks something, the system first searches a 
  knowledge base for the most relevant pieces of text.  
- **Augment**: those retrieved pieces get inserted into the prompt 
  alongside the user's question.  
- **Generate**: the language model then answers using that supplied 
  context, so its answer is grounded in you actual data rather than 
  its memory.  

### Data Optimization  

Prepare documents before they ever get searched.  

**Chuncking**: splitting documents into smaller pieces (you don't store 
a whole 50 page manual as one blob, you break it into searchable sections)  
**Cleaning**: remove junk like navigation menus or boilerplate.  
**Metadata labeling**: tagging each chunk with extra info (author, date, 
document type) so retrieval can filter intelligently.  

### Retrieval Enhancement  

Make the search step itself sharper. 

**Embeddings**: numerical representations of meaning. Retrieval usually 
works by converting text into  embeddings. Then finding chunks whose 
meaning is closest to the question.

**Fine-tuning embeddings**: adapts that meaning-model to your specific 
domain.  

**Rerankers**: a second pass that re-sorts the initial results to push 
the most relevant ones to the top.  

**Jargon/acronym mapping**: handles the case where a user types "RAG" but 
your documentation says "retrieval-augmented generation". Without it, 
the search might miss the match.  

### System Intelligence  

using LLMs no just to generate the final answer, but as helpers earlier 
the in the pipeline (rewriteing a vague user question into a better search 
query, or summarizing retrieved chunks before they go into the prompt).  

<!-- resource links -->  
[datacamp_rag] https://www.datacamp.com/blog/what-is-retrieval-augmented-generation-rag "Datacamp: What is RAG"  
[ibm_rag] https://www.ibm.com/think/topics/retrieval-augmented-generation "IBM RAG"  
[matillion_blog] https://www.matillion.com/blog/a-deep-dive-into-embedding-and-retrieval-augmented-generation-rag "Matillion deep-dive using Snowflake"  

