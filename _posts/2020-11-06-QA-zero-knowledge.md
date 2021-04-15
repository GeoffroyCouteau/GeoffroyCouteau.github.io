---
title: "[Q&A] Zero-Knowledge Proofs"
classes: wide
author_profile: true
<!-- sidebar:
  title: "Content"
  nav: sidebar-cheatsheet -->
excerpt_separator: "<!--more-->"
related: false
share: false
comments: false
read_time: false
permalink: /QA-ZK/
categories:
  - Q&A
tags:
  - zero-knowledge
  - cryptography stackexchange
---

<style>
div {
  text-align: justify;
  text-justify: inter-word;
}
</style>

### General questions

- [How to explain ZK proofs to a 7 year old?](https://crypto.stackexchange.com/questions/57674/how-do-i-explain-zero-knowledge-proof-to-my-7-year-old-cousin/57678#57678)
- [Are there lower bounds on the size and interaction of a ZK proof with a given soundness error?](https://crypto.stackexchange.com/questions/76929/minimizing-exchanges-for-zk-proof-of-a-message-with-given-sha-256/76983#76983)
- [Can we do zero-knowledge proofs for BPP statements?](https://crypto.stackexchange.com/questions/58461/zero-knowledge-proofs-in-bpp/58463#58463) (short answer: just send the witness!)
- [What is the difference between ZK proofs and ZK proofs of knowledge?](https://crypto.stackexchange.com/questions/68785/what-is-difference-between-zero-knowledge-proof-and-zero-knowledge-proof-of-know/68786#68786) (short answer: in ZK proof of knowledge, an extractor can recover the witness)
- [Why is computational ZK the most general notion of zero-knowledge?](https://crypto.stackexchange.com/questions/59481/why-is-computational-zero-knowledge-the-most-generic-notion-of-zero-knowledge/59492#59492)
- [How to choose the security parameter for a ZK proof?](https://crypto.stackexchange.com/questions/64650/is-there-a-rule-of-thumb-for-zk-protocols/64652#64652)
- [Are there lower bounds on the round complexity and communication of ZK proofs?](https://crypto.stackexchange.com/questions/76929/minimizing-exchanges-for-zk-proof-of-a-message-with-given-sha-256/76983#76983) (and also: how far are existing ZK proofs from these bounds)
- [How do common reference strings help in ZK proofs?](https://crypto.stackexchange.com/questions/71104/why-is-a-common-reference-string-needed-in-zero-knowledge-proofs/71109#71109) (short answer: they help reducing round complexity)
- [What are the links between ZK proofs and homomorphic encryption?](https://crypto.stackexchange.com/questions/57747/what-is-the-link-if-any-between-zero-knowledge-proof-zkp-and-homomorphic-enc/57759#57759) (short answer: there are many links.)

### Understanding ZK proofs

- [Why is "sending a hash of the witness" not a valid ZK proof of knowledge of the witness?](https://crypto.stackexchange.com/questions/70877/is-a-hash-a-zero-knowledge-proof/70883#70883) (also includes a walkthrough of why Schnorr's proof is a honest-verifier ZK proof)
- [Why is the Diffie-Hellman key-exchange protocol not a proof of knowledge of a discrete logarithm?](https://crypto.stackexchange.com/questions/70074/could-diffie-hellman-protocol-serve-as-a-zero-knowledge-proof-of-knowledge-of-di/70084#70084) (also includes a discussion about knowledge-of-exponent assumptions, and public-coin versus private coin proofs)

### Building ZK proofs

- [How to prove that a committed value is the square of the other?](https://crypto.stackexchange.com/questions/64476/how-to-prove-that-a-committed-value-is-the-square-of-other/66005#66005)
- [How to prove that a committed number belongs to a certain range?](https://crypto.stackexchange.com/questions/53745/is-it-possible-to-create-a-zero-knowledge-proof-that-a-number-is-more-than-zero/53762#53762)
- [What are the different techniques to build a range proof?](https://crypto.stackexchange.com/questions/42019/zero-knowledge-proof-for-sign-of-message-value/42029#42029)
- [Where did the four square decomposition technique originate?](https://crypto.stackexchange.com/questions/59441/complexity-of-boudots-zero-knowledge-range-proof-scheme/59446#59446)
- [How to prove that a number is not within a range?](https://crypto.stackexchange.com/questions/71057/how-would-i-prove-a-number-is-not-within-a-range/71080#71080)
- [How to prove knowledge of a witness for a DDH tuple?](https://crypto.stackexchange.com/questions/71252/given-a-b-g-h-prove-the-i-know-x-s-t-a-xg-and-b-xh/71388#71388)
- [Is it possible to prove knowledge of an AES key without showing it?](https://crypto.stackexchange.com/questions/55721/can-we-prove-possession-of-an-aes-256-key-without-showing-it/55723#55723) (short answer: yes)
- [How to prove correctness of a long computation with a short proof?](https://crypto.stackexchange.com/questions/53793/how-can-i-prove-the-result-of-a-long-computation-with-a-short-string/53830#53830)
- [Can we replace pairings by homomorphic encryption in SNARGs/SNARKs?](https://crypto.stackexchange.com/questions/64862/can-we-use-phe-or-swhe-instead-of-bilinear-pairings-in-zk-snarks/64864#64864) (short answer: yes, but it becomes designated-verifier)
- [How to prove soundness of $\Sigma$-protocols in unknown-order groups?](https://crypto.stackexchange.com/questions/76893/sigma-protocol-when-order-is-unknown/76991#76991)

### Others

- [Is it possible to randomize a non-interactive ZK proof?](https://crypto.stackexchange.com/questions/77371/randomizable-zero-knowledge-proofs/77378#77378) (short answer: yes)
- [What are the security issues of making ZK proofs non-interactive with Fiat-Shamir?](https://crypto.stackexchange.com/questions/71416/are-interactive-proofs-more-secure-their-non-interactive-counterpart/71444#71444) (short answer: transferability, computational soundness)
- [How to verify a signature on an encrypted message?](https://crypto.stackexchange.com/questions/57813/verifying-signature-of-plaintext-using-encrypted-message-only/57900#57900)
- [Why is Schnorr's proof not an argument?](https://crypto.stackexchange.com/questions/56317/schnorr-protocol-proof-or-argument/56325#56325) (short answer: recovering the discrete log in unbounded time does not contradict soundness)
- [Why is a transparent setup desirable for SNARKs?](https://crypto.stackexchange.com/questions/68077/transparent-setup-of-snarks/68130#68130)
- [Do NIZKs imply simulation-sound NIZKs?](https://crypto.stackexchange.com/questions/57751/can-we-construct-a-simulation-sound-nizk-non-interactive-zero-knowledge-proof/57758#57758) (short answer: yes)
- [Are there post-quantum SNARGs?](https://crypto.stackexchange.com/questions/63839/post-quantum-snargs-with-near-constant-verification/64023#64023)