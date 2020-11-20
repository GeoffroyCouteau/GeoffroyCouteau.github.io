---
title: "[Q&A] Cryptographic Primitives and Assumptions"
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
permalink: /QA-primitives/
categories:
  - Q&A
tags:
  - primitives
  - assumptions
  - cryptography stackexchange
---

<style>
div {
  text-align: justify;
  text-justify: inter-word;
}
</style>

### Public-Key Encryption

- [Is the RSA cryptosystem provably secure?](https://crypto.stackexchange.com/questions/64684/is-rsa-provably-secure-in-the-sense-of-douglas-stinsons-provable-security/64685#64685)
- [Are there public-key cryptosystems not relying on arithmetic over finite fields?](https://crypto.stackexchange.com/questions/54263/are-there-any-asymmetric-cryptographic-primitives-not-relying-on-arithmetic-ov/54265#54265) (short answer: yes)
- [Are there knapsack-based cryptosystems which have not been broken?](https://crypto.stackexchange.com/questions/44403/is-there-any-knapsack-based-cryptosystem-that-has-not-yet-been-broken/44410#44410) (short answer: yes)
- [Are there practical universal PKE schemes?](https://crypto.stackexchange.com/questions/83908/has-anyone-implemented-a-public-key-encryption-scheme-using-a-universal-one-way/83929#83929) (short answer: no)
- [Are there encryption schemes where the sender cannot prove that a given plaintext was encrypted?](https://crypto.stackexchange.com/questions/77113/is-there-any-encryption-system-where-the-sender-cannot-prove-that-a-specific-cip/77261#77261)
- [Can we use ElGamal over $\mathbb{Z}\_{n^2}$?](https://crypto.stackexchange.com/questions/54805/can-i-use-modulo-n2-arithmetic-where-n-p-cdot-q-for-elgamal-encryption/54826#54826) (short answer: not directly)

### Homomorphic Encryption

- [Can FHE compute comparisons?](https://crypto.stackexchange.com/questions/57714/can-fully-homomorphic-encryption-do-comparisons/57716#57716) (short answer: yes)
- [Are there FHE schemes for deep learning operations?](https://crypto.stackexchange.com/questions/55596/homomorphic-encryption-for-deep-learning/55598#55598) (short answer: yes)
- [How short can be an FHE ciphertext?](https://crypto.stackexchange.com/questions/67403/what-is-the-shortest-ciphertext-size-output-by-fhe/67421#67421) (short answer: almost as short as the message it encrypts)
- [Are all homomorphic encryption schemes based on lattices?](https://crypto.stackexchange.com/questions/84419/are-all-homomorphic-encryption-schemes-based-on-latticed-based-schemes/84421#84421) (short answer: it depends)
- [Is there a BGN-like encryption scheme without restriction on the plaintext space?](https://crypto.stackexchange.com/questions/67513/bgn-encryption-scheme-with-unbounded-message-space/67536#67536) (short answer: yes)
- [Are there additive homomorphic encryption schemes that support exponentiation?](https://crypto.stackexchange.com/questions/32830/is-there-an-additive-homomorphic-encryption-that-supports-exponentation/33059#33059)

### Obfuscation

- [Why do we use multilinear maps in obfuscation schemes?](https://crypto.stackexchange.com/questions/43527/why-do-we-use-multilinear-maps-for-obfuscation/43530#43530) (short answer: they are essentially necessary in a well defined sense -- though that does not mean constructions must explicitely go through them!)
- [Can we obfuscate functions that are mostly zero?](https://crypto.stackexchange.com/questions/67696/obfuscating-functions-that-are-mostly-zero/67741#67741) (short answer: there is a gradation of increasingly complex obfuscation schemes from increasingly stronger assumptions for increasingly larger subclasses of mostly zero function; the linked answer provide a detailed overview.)

### Symmetric Primitives

- [Why is it plausible that hash functions are quantum secure?](https://crypto.stackexchange.com/questions/44386/are-cryptographic-hash-functions-quantum-secure/44390#44390)
- [Does IND-CPA security imply PRFs?](https://crypto.stackexchange.com/questions/45189/does-ind-cpa-imply-prf/45195#45195) (short answer: yes)
- [Is it possible to build a symmetric encryption scheme with beyond-brute-force security?](https://crypto.stackexchange.com/questions/72880/is-an-invulnerable-code-possible-including-brute-force-attack/72928#72928) (short answer: yes, but only if the messages come from a specific distribution)
- [What are the differences between the various notions of CPA security?](https://crypto.stackexchange.com/questions/33279/difference-left-or-right-cpa-security-ind-cpa-security/33281#33281)

### Cryptographic Assumptions

- [Is it hard to compute $(g^{ab})$ given $(g^a, g^b, a/b)$?](https://crypto.stackexchange.com/questions/68403/is-it-hard-to-compute-gab-when-given-g-ga-gb-fracab/68419#68419) (short answer: yes, under the square Diffie-Hellman assumption)
- [Why do subexponential attacks on the DLP not work for ECDLP?](https://crypto.stackexchange.com/questions/33144/why-do-the-subexponential-algoriths-for-the-dlp-not-work-for-the-ecdlp/33145#33145) (short answer: you don't have small prime values over elliptic curves in general)
- [What relation is known between LWE and LPN?](https://crypto.stackexchange.com/questions/65999/are-lpn-and-lwe-problems-equivalent/66003#66003)
- [Are there known reductions from LWE to MLWE or RLWE?](https://crypto.stackexchange.com/questions/84122/mlwe-and-rlwe-to-lwe-reductions-proof/84124#84124) (short answer: no)
- [Are there decisional variants of the discrete logarithm problem?](https://crypto.stackexchange.com/questions/78011/decisional-discrete-logarithm-problem/78012#78012) (short answer: yes)

### Others

- [What are smooth projective hash functions?](https://crypto.stackexchange.com/questions/44870/what-is-a-smooth-projective-hash-function/44871#44871)
- [Why do we use pairing-based cryptography?](https://crypto.stackexchange.com/questions/56400/why-pairings-on-elliptic-curve-are-used/56421#56421)
- [Is there a password-authenticated key-exchange making only a blackbox use of standard cryptographic primitives?](https://crypto.stackexchange.com/questions/44371/is-there-any-srp-like-key-exchange-only-using-standard-cryptographic-primitive/44434#44434) (short answer: this seems open, and it is a great question)
- [Why are generalized Pedersen commitments secure?](https://crypto.stackexchange.com/questions/55955/using-pedersen-commitment-for-a-vector/55970#55970)
- [Are there results on the space complexity of cryptographic primitives?](https://crypto.stackexchange.com/questions/60457/space-complexity-and-cryptography/60551#60551) (short answer: yes)
- [Why are VDFs preferred to proofs of sequential work?](https://crypto.stackexchange.com/questions/71564/verifiable-delay-functions-vs-proof-of-sequential-work/71567#71567)
- [What are the cryptographic advantages of using the subgroup of pseudosquares?](https://crypto.stackexchange.com/questions/34221/what-is-the-advantage-of-pseudosquare/34225#34225)
- [What are the standard constructions of PRFs from well-known assumptions?](https://crypto.stackexchange.com/questions/70083/constructions-of-prf-pseudo-random-function/70085#70085)
- [Can you build searchable encryption from the discrete logarithm problem?](https://crypto.stackexchange.com/questions/54156/is-discrete-logarithmic-assumption-enough-to-design-a-secure-searchable-encrypti/54159#54159)
- [Is it possible to prove that a document was generated long ago?](https://crypto.stackexchange.com/questions/43751/is-it-possible-to-prove-the-age-of-a-document/43761#43761)
- [Can Pedersen commitments be made deterministic?](https://crypto.stackexchange.com/questions/78007/sigma-protocol-with-pedersen-commitment-and-hash-function/78010#78010) (short answer: only if you have high min-entropy plaintexts and settle for a weaker security notion)