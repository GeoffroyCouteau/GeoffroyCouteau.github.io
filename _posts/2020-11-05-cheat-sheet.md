---
title: "Probabilities and Counting -- Cheat Sheet"
classes: wide
author_profile: false
sidebar:
  title: "Content"
  nav: sidebar-cheatsheet
excerpt_separator: "<!--more-->"
related: false
share: false
comments: false
read_time: false
permalink: /cheat-sheet/
categories:
  - Cheat Sheet
tags:
  - probabilities
---

<style>
div {
  text-align: justify;
  text-justify: inter-word;
}
  h5 {
    display:inline
}
</style>

In the course of working on various projects, I found myself spending an excessive amount of time skimming through textbooks and Wikipedia pages to be reminded of the exact statement of various simple probability facts and lemmas. In some cases, this was to check that I was getting the constants right, or not forgetting a condition -- in others, this was just out of laziness. To simplify future searches, I decided to centralize in a cheat sheet a bunch of standard probability lemmas, starting from the most basic facts, but also including some slightly more advanced lemmas. These lemmas showed up several times in my work, and are likely to be useful to cryptographers and theoretical computer scientists. An outdated PDF version of this cheat sheet, in a compact two-column format, is also available [here](/assets/pdf/cheat_sheet.pdf).
{: style="text-align: justify;"}

<!--more-->

<!-- {% include toc icon="." title="Contents" %} -->


### Notations

Let $\mathsf{Ber}\_p$ denote the Bernouilli distribution with probability $p$. $\mathsf{SD}(X,Y)$ denotes the statistical distance between random variables $(X,Y)$ over a set $S$, defined as

\begin{align}
\mathsf{SD}(X,Y) &= \frac{1}{2} \cdot \sum_{x\in S} |\Pr[X = x] - \Pr[Y = x]|\\\\  
&= \max_{f:S\mapsto\{0,1\}} |\Pr[f(X)=1] - \Pr[f(Y) = 1]|\\\\  
&= \max_{Z\subseteq S} |\Pr[X \in Z] - \Pr[Y \in Z]|.
\end{align}

### Basic Probabilities

<a name="union"></a>**Union Bound:** $\Pr[A \cup B] \leq \Pr[A] + \Pr[B].$

<a name="bayes"></a>**Bayes' Rule:** $\Pr[A \| B] = \frac{\Pr[B \| A]\cdot \Pr[A]}{\Pr[B]}.$

<a name="others"></a>**Others:** 

\begin{align}
\Pr[A \cap B] &\leq \min\\{\Pr[A],\Pr[B],\Pr[A\|B], \Pr[B\|A]\\}\\\\ 
\Pr[A] + \Pr[B] - 1 &\leq \Pr[A \cup B]
\end{align}

### Expectations

If $X$ is a random variable taking nonnegative integer values, then

$$\mathbb{E}[X] = \sum_{k=1}^{\infty} \Pr[X \geq k].$$

For nonnegative $X$ and differentiable $f$,

$$\mathbb{E}[f(X)] = f(0) + \int_{0}^{\infty} f'(x)\Pr[X \geq x]dx.$$

<a name="cauchy"></a>**Cauchy-Schwarz:** $\|\mathbb{E}[XY]\| \leq \mathbb{E}[\|XY\|] \leq \sqrt{\mathbb{E}[\|X\|^2]\mathbb{E}[\|Y\|^2]}.$

<a name="jensen"></a>**Jensen:** $\text{For }\phi \text{ convex, } \phi(\mathbb{E}[X]) \leq \mathbb{E}[\phi(X)].$

### Bias

Given a distribution $\mathcal{D}$ over $\mathbb{F}^n$ and a vector $\vec u \in \mathbb{F}^n$, the bias of $\mathcal{D}$ with respect to $\vec u$, denoted $\mathsf{bias}\_{\vec u}(\mathcal{D})$, is equal to

$$\mathsf{bias}_{\vec u}(\mathcal{D}) = \left|\mathbb{E}_{\vec x \sim \mathcal{D}}[\vec u^\intercal \cdot \vec x] - \mathbb{E}_{\vec x \sim \mathbb{U}_n}[\vec u^\intercal \cdot \vec x]  \right| = \left|\mathbb{E}_{\vec x \sim \mathcal{D}}[\vec u^\intercal \cdot \vec x] - \frac{1}{|\mathbb{F}|} \right|,$$

where $\mathbb{U}\_n$ denotes the uniform distribution over $\mathbb{F}^n$.
The bias of $\mathcal{D}$, denoted $\mathsf{bias}(\mathcal{D})$, is the maximum bias of $\mathcal{D}$ with respect to any nonzero vector $\vec u$.

 Given $t$ distributions $(\mathcal{D}\_1, \cdots, \mathcal{D}\_t)$ over $\mathbb{F}\_2^n$, we denote by $\bigoplus\_{i\leq t} \mathcal{D}\_i$ the distribution obtained by independently sampling $\vec v\_i \gets_r \mathcal{D}\_i$ for $i=1$ to $t$ and outputting $ \vec v \gets\vec v\_1 \oplus \cdots \oplus \vec v\_t$. Then $\mathsf{bias}( \bigoplus\_{i\leq t} \mathcal{D}\_i ) \leq 2^{t-1}\cdot \prod_{i=1}^t \mathsf{bias}(\mathcal{D}\_i) \leq \min_{i \leq t} \mathsf{bias}(\mathcal{D}_i)$. Note that the piling up lemma (given below) can provide a tighter bound if needed.

### Concentration Bounds

<a name="markov"></a>**Markov Inequality:** Let $X$ be a positive random variable with finite expected value $\mu$. Then for any $k > 0$,

$$\Pr[X \geq k] \leq \frac{\mu}{k}.$$

<a name="chebyshev"></a>**Bienaymé-Chebyshev Inequality:** Let $X$ be a random variable with finite expected value $\mu$ and finite nonzero variance $\sigma^2$. Then for any $k > 0$,

$$\Pr[|X - \mu| \leq k\sigma] \leq \frac{1}{k^2}.$$

<a name="chernoff"></a>**Chernoff Inequality:** Let $n\in\mathbb{N}$ and let $(X_1, \cdots, X_n)$ be independent random variables taking values in $\{0,1\}$. Let $X$ denote their sum and $\mu \gets \mathbb{E}[X]$. Then for any $\delta \in [0,1]$,

$$\Pr[X \geq (1+\delta)\mu] \leq \exp\left(-\frac{\delta^2\mu}{3}\right)\text{ and } \Pr[X \leq (1-\delta)\mu] \leq \exp\left(-\frac{\delta^2\mu}{2}\right).$$

Furthermore, for any $\delta \geq 0$,

$$\Pr[X \geq (1+\delta)\mu] \leq \exp\left(-\frac{\delta^2\mu}{2+\delta}\right).$$

Note also the tighter, but dirtier bounds:

$$\Pr[X \geq (1+\delta)\mu] \leq \left(\frac{e^\delta}{(1+\delta)^{1+\delta}}\right)^{\mu}\text{ and } \Pr[X \leq (1-\delta)\mu] \leq \left(\frac{e^{-\delta}}{(1-\delta)^{1-\delta}}\right)^{\mu}.$$

<a name="gen-chernoff"></a>**Generalized Chernoff Inequality ([here][generalized]):** Let $n\in\mathbb{N}$ be an integer and let $(X_1, \cdots, X_n)$ be boolean random variables such that, for some $\delta\in [0,1]$, it holds that for every subset $S \subset [n]$, $\Pr[\wedge_{i\in S} X_i] \leq \delta^{\|S\|}.$ Then for any $\gamma \in [\delta, 1]$,

$$\Pr\left[\sum_{i=1}^nX_i \geq \gamma n\right] \leq \exp\left(-n D(\gamma||\delta)\right),$$

where $D(\gamma\|\|\delta)$ denotes the relative entropy function, satisfying $D(\gamma\|\|\delta) \geq 2(\gamma-\delta)^2$. For more discussions and a constructive proof of the generalized Chernoff bound, see [Impagliazzo and Kabanets][impkab].

<a name="bernstein"></a>**Bernstein Inequality:** Let $X_1, \cdots, X_m$ be independent zero-mean random variables, and let $M$ be a bound such that $\|X_i\| \leq M$ almost surely for $i=1$ to $m$. Let $X$ denote the random variable $\sum_{i=1}^m X_i$. It holds that

$$\Pr[X > B] \leq \exp\left(- \frac{B^2}{2\sum_{i=1}^m \mathbb{E}[X_i^2] + \frac{2}{3}MB}\right).$$

<a name="bdi"></a>**Bounded Difference Inequality:** First proved by [McDiarmid][mcdiarmid], in a more general form than below. Special case of [Azuma inequality][azuma]. Let $(n,m)\in\mathbb{N}^2$ be two integers. We say that a function $\Phi:[n]^m\mapsto \mathbb{R}$ satisfies the *Lipschitz property with constant $d$* if for every $\vec x, \vec x' \in [n]^m$ which differ in a single coordinate, it holds that $\|\Phi(\vec x) - \Phi(\vec x')\| \leq d.$ Then, the statement of the bounded difference inequality is as follows: let $\Phi:[n]^m\mapsto \mathbb{R}$ be a function satisfying the Lipschitz property with constant $d$, and let $(X_1, \cdots, X_m)$ be independent random variables over $[n]$. It holds that

$$\Pr[\Phi(X_1, \cdots, X_m) < \mathbb{E}[\Phi(X_1, \cdots, X_m)] - t] \leq \exp\left(-\frac{2t^2}{m\cdot d^2}\right).$$

### Entropy Notions

Let $\mathsf{H}(x) = x\log(1/x) + (1-x)\log(1/(1-x))$ be the binary entropy function. We let 

$$\mathsf{H}_1(X),\; \mathsf{H}_\infty(X),\; \mathsf{H}_\infty(X\;|\; Z),\; \mathsf{H}^{\varepsilon}_\infty(X)$$

denote respectively the Shannon entropy, min-entropy, average min-entropy conditioned on $Z$, and $\varepsilon$-smooth min-entropy of a random variable $X$, defined as

\begin{align}
\mathsf{H}\_1(X) &= - \sum_{x = 1}\Pr[X= x]\cdot \log\Pr[X= x]\\\\  
\mathsf{H}\_\infty(X\;|\; Z) &= - \log\mathbb{E}\_{z\gets Z}[2^{-\mathsf{H}\_\infty(X\;|\;Z=z)}]\\\\  
\mathsf{H}^{\varepsilon}\_\infty(X) &= \max_{\mathsf{SD}(X,Y)\leq \varepsilon} \mathsf{H}\_\infty(Y)\\\\  
\mathsf{H}\_1(X) &= - \sum_{x\in \mathsf{Supp}(X)}\Pr[X= x]\cdot \log\Pr[X= x]
\end{align}

Note that $\mathsf{H}\_1(\mathsf{Ber}\_p) = \mathsf{H}(p)$.

#### Some lemmas on entropy

**[Dodis et al.][dodis], Lemma 2.2a:** For any $\delta > 0$, $\mathsf{H}\_\infty(X\|Z = z)$ is at least $\mathsf{H}\_\infty(X\;\|\; Z) - \log(1/\delta)$ with probability at least $1-\delta$ over the choice of $z$.

**[Dodis et al.][dodis], Lemma 2.2b:** Conditioning on $Z$ that has $b$ bits of information reduces the entropy of $X$ by at most $b$: $\mathsf{H}\_\infty(X\;\|\; Z_1,Z_2) \geq \mathsf{H}\_\infty(X, Z_1\;\|\; Z_2) - \log \|\mathsf{Supp}(Z_1)\|$.

### Binomial Coefficients

<a name="sbc"></a>**Sums of Binomial Coefficients:** For any $0 <  \mu < 1/2$ and $m\in\mathbb{N}$,

  $$\sum_{i=0}^{\mu m} {m \choose i} = 2^{m\mathsf{H}(\mu) - \frac{\log m}{2} + O(1)}.$$

  Alternatively, writing

  $$\sum_{i=1}^{\mu m} {m \choose i} = {m \choose \mu m} \left [ 1 + \frac{\mu m}{m-\mu m +1} + \frac{\mu m (\mu m - 1)}{(m-\mu m +1)(m - \mu m + 2)} + \cdots \right ],$$

  we get, bounding the above by a geometric series:

  $$\sum_{i=1}^{\mu m} {m \choose i} \leq {m \choose \mu m} \cdot \frac{1-\mu}{1-2\mu}.$$

<a name="stirling-approximation"></a>**Stirling's Approximation:**

$$\frac{1}{\sqrt{2\pi n \delta (1-\delta)}} \exp\left(n\cdot\mathsf{H}(\delta) - \frac{1}{12 n \delta (1-\delta)} \right) \leq {n \choose \delta n} \leq \frac{1}{\sqrt{2\pi n \delta(1-\delta)}}\exp\left(n\cdot \mathsf{H}(\delta)\right).$$

$$\sqrt{\frac{n}{8k(n-k)}}\cdot e^{n\cdot h(k/n)} \leq {n \choose k} \leq \sqrt{\frac{n}{2\pi k(n-k)}}\cdot e^{n\cdot h(k/n)},$$

where $h(\cdot)$ denotes the binary entropy function. The version above is taken from Bob Gallager's [Information Theory and Reliable Communications]()

<a name="bin-others"></a>**Others:**

  - For $k = o(n)$, $\log {n\choose k} = (1+o(1))k \log \frac{n}{k}$.
  - For any $(k,n)$, $\left(\frac{n}{k}\right)^k \leq {n \choose k} \leq \frac{n^k}{k!} < \left(\frac{ne}{k}\right)^k$.

### Useful Inequalities

  - $\forall x > 0$, $\exp(-x) > 1-x$.
  - $\forall\; 0 < x < \frac{2-\sqrt{2}}{2}$, $1-x > 2^{- \frac{2+\sqrt{2}}{2} x}$.
  - $\forall n\geq 1$, $\left(1-\frac{1}{n}\right)^{n} \leq \exp\left(-1\right)$, and $\exp(-1) \leq \left(1-\frac{1}{n}\right)^{n-1}$.
  - $\forall \delta > 0$, $\frac{2\delta}{2+\delta} \leq \log(1+\delta)$.

### Useful Lemmas

#### Splitting Lemma

Let $A\subset X \times Y$ such that $\Pr[(x,y) \in A] \leq \varepsilon$. For any $\varepsilon' < \varepsilon$, defining $B$ as $B = \{(x, y) \in X \times Y \;\|\; \Pr_{y'\gets_r Y}[(x, y') \in A] \geq \varepsilon - \varepsilon'\}$, it holds that

\begin{align}
\Pr[B]\geq \varepsilon' &&\forall (x,y)\in B, \Pr_{y'}[(x,y')\in A]\geq \varepsilon - \varepsilon' &&\Pr[B|A] \geq \varepsilon'/\varepsilon.
\end{align}

#### Forking Lemma

For any $q\geq 1$, any set $H$ with $\|H\| \geq 2$, and randomized PPT algorithm $\mathcal{A}$ which, on input $(x, h_1, \cdots, h_q)$ returns a pair $(J,\sigma) \in [q]\times \{0,1\}^{\*}$, and input distribution $\mathcal{D}$, let

$$\mathsf{acc} \gets \Pr[x \gets_r \mathcal{D}, (h_1, \cdots, h_q) \gets_r H, (J,\sigma) \gets_r \mathcal{A}(x, h_1, \cdots, h_q) : J \geq 1].$$

Then define the following algorithm $F_{\mathcal{A}}$: on input $x \in \mathsf{Supp}(\mathcal{D})$, $F_{\mathcal{A}}(x)$ picks coins $r$, $(h_1, \cdots, h_q) \gets_r H$, and runs $(I, \sigma) \gets \mathcal{A}(x, h_1, \cdots, h_q; r)$. If $I=0$, it returns $(0, \varepsilon, \varepsilon)$. Else, it picks $(h'\_1, \cdots, h'\_q) \gets\_r H$, and runs $(I', \sigma') \gets \mathcal{A}(x, h_1, \cdots, h_{I-1}, h'\_I, \cdots, h'\_q; r)$. If $I=I'$ and $h_I \neq h_{I'}$, it returns $(1, \sigma, \sigma')$; else, it returns $(0,\varepsilon, \varepsilon)$. Let

$$\mathsf{frk} \gets \Pr[x \gets_r \mathcal{D}, (b,\sigma, \sigma') \gets_r F_{\mathcal{A}}(x) : b = 1].$$

Then

$$\mathsf{acc} \leq \frac{q}{h} + \sqrt{q\cdot \mathsf{frk}}.$$

#### Leftover Hash Lemma

To be added later.

#### Piling-Up Lemma

For $0 < \mu < 1/2$ and random variables $(X_1, \cdots, X_t)$ i.i.d. to $\mathsf{Ber}\_\mu$, it holds that

$$\Pr\left[\bigoplus_{i=1}^t X_i = 0\right] = \frac{1}{2}\cdot\left(1 + (1-2\mu)^t\right) = \frac{1}{2} + 2^{-c_\mu t-1},$$

where $c_\mu = \log \frac{1}{1-2\mu}$. In other terms, for any $0 < \mu \leq \mu' < 1/2$, it holds that

$$\mathsf{Ber}_\mu \oplus \mathsf{Ber}_{\frac{\mu'-\mu}{1-2\mu}} \approx \mathsf{Ber}_{\mu'}.$$

### Hashing

To come: universal hashing, pairwise independent hashing

[impkab]: https://link.springer.com/chapter/10.1007/978-3-642-15369-3_46
[azuma]: https://www.jstage.jst.go.jp/article/tmj1949/19/3/19_3_357/_pdf
[mcdiarmid]: https://www.ime.usp.br/~tassio/TMP/ler/McDiarmid-on-the-method-of-bounded-differences-89.pdf
[dodis]: https://www.iacr.org/archive/eurocrypt2004/30270518/DRS-ec2004-final.pdf
[generalized]: https://epubs.siam.org/doi/abs/10.1137/S0097539793250767?journalCode=smjcat
