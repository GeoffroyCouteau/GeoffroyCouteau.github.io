---
title:  "Grant Projets"
layout: archive
author_profile: true
permalink: /grants/
comments: false
classes: wide
---

<style>
div {
  text-align: justify;
  text-justify: inter-word;
}
</style>

The list of all past and present grant-funded research projects where I am involved.

### As Principal Investigator

|---|---|---|---|---|---|
| Project | Acronym | Team members | Duration | Fundings | Type |
|---|---|---|---|---|---|---|
| [Overcoming Barriers and Efficiency <br> Limitations in Secure Computation](https://geoffroycouteau.github.io/obelisc) | OBELiSC | -- | 2024 -- 2028 | €1.5M | [ERC Starting Grant](https://erc.europa.eu/apply-grant/starting-grant) |
| LInear Codes ENabling Computation <br> over Encrypted Data | LICENCED | [Alain Couvreur](https://www.lix.polytechnique.fr/Labo/Alain.Couvreur/) | 2022 -- 2023 | €65.000 | [DIM RFSI](https://dim-rfsi.fr/projets/appel-a-projets-scientifiques-2021) |
| Secure Computation over <br> Encrypted Networks | SCENE | [Adi Rosén](https://www.irif.fr/~adiro/),<br> [Yann Rotella](https://rotella.fr/) | 2021 -- 2024 | €170.000 | [ANR JCJC](https://anr.fr/fr/detail/call/appel-a-projets-generique-2021/?tx_anrprojects_request%5Baction%5D=show&cHash=16674fce7ebadc3329d8e0c319f14624) |

### As Local Coordinator

|---|---|---|---|---|---|
| Project | Acronym | Principal <br> Investigator | Duration | Fundings | Type |
|---|---|---|---|---|---|---|
| Secure Computations | SecureCompute | [David Pointcheval](https://www.di.ens.fr/david.pointcheval/index.php) | 2022 -- 2028 | €5M (1M IRIF)| [PEPR <br> Cybersécurité](https://anr.fr/fr/detail/call/pepr-cybersecurite-appel-a-projets-2022/?tx_anrprojects_request%5Baction%5D=show&cHash=8e3af47312e6cd8cd8ceb49d19667954) |

### As Member

|---|---|---|---|---|---|
| Project | Acronym | Principal <br> Investigator | Duration | Fundings | Type |
|---|---|---|---|---|---|---|
| Algèbre, preuves, protocoles,<br> algorithmes, courbes, et surfaces<br> pour les codes et leurs applications | BARRACUDA | [Alain Couvreur](https://www.lix.polytechnique.fr/Labo/Alain.Couvreur/) | 2022 -- 2025 | €377.000 | [ANR PRC](https://anr.fr/fileadmin/aap/2021/selection/aapg-selection-2021-3.pdf) |

<!--
## ANR Project --- SCENE


### Context

A vast body of work has been dedicated to the development of widely adopted methods to protect the exchange of sensitive data over large communication networks, such as the web. Almost 75% of the total internet traffic [is now encrypted](https://www.fortinet.com/blog/industry-trends/as-the-holiday-season-draws-near--mobile-malware-attacks-are-pre.html); in parallel, a vast ecosystem of data-driven applications has emerged, building upon the impressive development of machine learning algorithms. When fed with large sets of labelled data, deep neural networks and other supervised learning methods have the potential to revolutionize numerous sectors, from autonomous cars to the discovery of new therapeutics. This creates a paradoxical situation: the importance of protecting individual’s privacy is now widely recognized, and encrypted communication became the default form of communication; yet, there are strong incentives to publicly reveal the very same private information that encryption methods were designed to protect – at the individual level, because this enables the use of applications such as social networks and recommendation systems, and at the society level, because datasets of sensitive information are the core resource needed in machine learning methods.

To resolve this contradictory situation, the approach has been until now to release private databases stripped of clear identifying data (names, address, email, phone number). Typically, anonymized medical data have not been considered private across the world, and are made [publicly accessible](https://healthdata.gov/), or [distributed](https://www.newscientist.com/article/2086454-revealed-google-ai-has-access-to-huge-haul-of-nhs-patient-data/#ixzz62LTrEfc3) to researchers and industrials. However, it is now widely recognized that this completely fails to reconcile privacy with data usability: even after being anonymized, the remaining information in these public datasets suffices, in an overwhelming majority of the cases, to fully identify almost every individual in the dataset ([1](https://www.gwern.net/docs/genetics/2013-gymrek.pdf), [2](https://arxiv.org/pdf/1902.00717.pdf), [3](https://imperialcollegelondon.app.box.com/s/lqqcugie51pllz26uixjvx0uio8qxgo5/file/493461282808), among many others -- for example, the combination of ZIP code, birth date, and gender already suffices to uniquely identify 87% of the American population, see [4](https://dataprivacylab.org/projects/identifiability/paper1.pdf)). This creates a major concern for privacy, and as the policy makers are realizing it, regulations are evolving in consequence (including modifications to the US HIPAA, or the EU GDPR).

Secure computation is an active research area, introduced in 1986 in the seminal work of [Yao](https://ieeexplore.ieee.org/document/4568207). In the conflicting interplay between the need for large datasets in machine learning applications, and the crucial importance of protecting sensitive data, secure computation aims at achieving the best of both worlds and fully reconciling these two goals. It allows to distributively evaluate arbitrary functions on private data held by different individuals, without disclosing these data publicly – in fact, without ever disclosing anything more than the outcome of the calculation, even to the participants. Hence, rather than anonymizing datasets before using them in calculations, secure computation allows to never reveal them. With the failure of data anonymization, secure computation has emerged as the most promising approach for guaranteeing the privacy of sensitive data without giving up on the promises of modern data-driven applications. While early feasibility results were mainly of theoretical interest, there has been tremendous improvements in the past decade, to the point that modern protocols are now no longer beyond the reach of the computational power of modern computers. As a consequence, secure computation solutions are now being proposed by several companies ([1](https://sharemind.cyber.ee/), [2](https://www.unboundtech.com/)) , and secure computation protocols have already been used in a variety of real-world situations where important calculations had to be done on data that could not be disclosed, from [auctions in agriculture markets](https://eprint.iacr.org/2008/068.pdf) to [IT studies in Estonia](https://eprint.iacr.org/2015/1159.pdf), from [tax-fraud detection](https://cyber.ee/research/reports/T-4-24-Privacy-preserving-tax-fraud-detection-in-the-cloud-with-realistic-data-volumes.pdf) to computation of [pay equity metrics by gender and ethnicity](https://www.cs.bu.edu/techreports/pdf/2016-008-mpc-lightweight-web-app.pdf) in the Boston area.

However, as of today, the deployment of concrete solutions for secure computation remains severely limited: in the above examples, preparing the secure protocol required months to years of work of a dedicated team, and executing it required hours of computations over large servers. This remains very far from a satisfying solution to the usability versus privacy problem, which would require a large-scale, on-demand secure computation solution which can be run quickly and efficiently over standard machines, between any group of users interacting over an encrypted communication network.

### Objective

In this context, our goal is to push the efficiency boundaries of large-scale secure computation, both asymptotically (by obtaining upper and lower bounds on the efficiency which secure computation protocols can reach in various models) and with respect to concrete runtime (by pushing forward a new approach to overcome the limitations of the standard paradigm secure computation). Our aim is also to evaluate precisely the concrete efficiency of our protocols through runtime analysis; as the coordinator of this project did in previous works on overcoming efficiency barriers for secure computation, we will also seek to obtain optimized implementations for some of the protocols developed in this project, through collaborations with researchers outside of the team, in order to precisely evaluate their impact on secure computation in real world situations.

<!-- We now elaborate on our approach. In the modern paradigm used in all recent works, a secure computation protocol is divided in two phases: a preprocessing phase, in which long, correlated random strings (independent of the private inputs) are generated and distributed among the participants, and an online phase, in which the material generated in the preprocessing phase (from now on, the preprocessing material) is used in the actual computation. This model is called the preprocessing model. The advantage of this method is that the online phase is, in general, extremely efficient: its computational efficiency is comparable to that of computing the function in the clear. The generation of the preprocessing material, while considerably more expensive, does not require the knowledge of the inputs or the target function, hence can be executed ahead of time. Yet, while this approach makes secure computation practically feasible, the heavy preprocessing phase is what prevents it from being widely deployed in practice. Indeed, each time the participants want to enable the possibility of executing a single secure protocol in the future, they need to engage ahead of time in a computationally intensive preprocessing phase with each of the possible participants, and store very large quantities of preprocessing material until the actual computation takes place. This makes this approach prohibitive for regular users (as opposed to, e.g., countries or major companies).

The coordinator of the project, Geoffroy Couteau, has laid two years ago the foundations of a new approach, whose goal is to resolve this issue and enable secure computation to be widely used, at practically feasible computational and storage costs [1-2,5,7]. This new approach is best described through its analogy to the simpler task of protecting communications: secure communication proceeds by letting the users exchange short keys, which can be locally used to encrypt arbitrarily large amounts of data (using symmetric ciphers) before sending them over the network. Similarly, this new approach aims at designing methods which allow the users to distributively generate short correlated keys, which can then be locally used by the participants to generate, whenever they need to execute a secure computation protocol, arbitrarily large amounts of preprocessing material, without requiring any interaction or long-term storage. This would effectively enable a large-scale use of secure computation over encrypted networks such as the internet, overcoming most efficiency barriers that prevent it from being currently deployed. The development of methods for the local generation of arbitrary amounts of preprocessing material is a very challenging problem, with deep connections to theoretical questions in cryptography, coding theory, and learning theory; yet, important theoretical and practical improvements have already been made in the past years by the coordinator of the project [1-2,4-5,7], partly in collaboration with another member [4]. These previous results mainly addressed the case of computations involving two users; the important case of large-scale distributed computation remains essentially open, and is the main target of this project.
 -->