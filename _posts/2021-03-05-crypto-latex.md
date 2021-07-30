---
title: "Basic LaTeX Template for Writing Crypto Papers"
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
permalink: /latex/
categories:
  - Posts
tags:
  - latex
---

<style>
div {
  text-align: justify;
  text-justify: inter-word;
}
</style>

The aim of this post is to provide a simple, ready-for-use LaTeX article template for writing research papers on cryptography. This is the setup I generally use in my papers, and I figured it could be useful, e.g. for PhD student in crypto. This templates contains:

- My default main file, for conference versions or full versions of my research papers;
- My default header file;
- The basic additional files which are usually needed, such as the llncs class file, which is the (typically mandatory) class for articles submitted to IACR conferences.

This is not a post about how to install LaTeX, or how to setup a work environment; I assume that you already have a working LaTeX distribution, together with a text editor (I personally use Sublime Text) and a pdf reader (I use Skim). Also, I'm not the author of the template; I probably got it from [David Pointcheval](https://www.di.ens.fr/david.pointcheval/index.php) or [Fabrice Benhamouda](https://www.normalesup.org/~fbenhamo/) (they also likely got it from somewhere else themselves), and made a bunch of modifications here and there. 

## The template

You can download the basic template [here](/assets/other/Template_Latex.zip). To start using it, you will also need the crypto.bib file (not included directly since it's a bit heavy), which contains bib references for most standard crypto conferences, journals, and for ePrint papers. To get the file, just go to [cryptobib.di.ens.fr](https://cryptobib.di.ens.fr/) and download the crypto.bib file (on the left) inside the cryptobib folder of the template.

## How to use it

Most of it is self-explanatory. The main file is main.tex. Setting \fullversion to 1 will switch to a format with smaller margins, while setting it to 0 recovers the default margins which are mandatory for submissions to most IACR conferences, such as CRYPTO and EUROCRYPT. Other toggles control whether the submission is anonymous, or whether todos should be shown.

I usually put all other LaTeX files in ther directory tex_files. All standard packages and macro are in the file ZZ_header.tex, in the tex_files folder. If you plan to use the template, take a few minutes to scroll it to get a grasp of the many useful shortcuts (with standard crypto notations such as \Enc, \Dec, or useful math notations such as \F for $\mathbb{F}$, \bit for $\\{0,1\\}$, etc).

I usually create a new LaTeX file for each new section, and input it directly in the main, like that:

```latex
\section{Introduction}
\label{sec:introduction}
\input{tex_files/01_introduction}
```

## Using cryptobib

Most references you will need can be found in the crypto.bib file. In many situations, downloading the file will suffice for your need, but sometimes the project might run for a longer time, and involve more people, in which case you might want the crypto.bib updates to be added automatically to your project. This can be done using submodules on git, or externals on svn. This is all well explained in the [manual](https://cryptobib.di.ens.fr/manual).

I usually add all missing citations in add.bib. To get them, I look for the paper on [Google Scholar](https://scholar.google.com/). The bibtex can be found under the "cite" icon (a quote sign).

The default template for citations is the following:

```
[venue_acronym]:[author_initials][year]
```

where:

- venue_acronym is the standard shortcut for the name of the crypto conference or journal, e.g. EC for Eurocrypt, AC for Asiacrypt, EPRINT for ePrint, JoC for the Journal of Cryptology...
- author_initials is the full author last name for papers with a single author (e.g. EC:Couteau19), the first three letters of each names for papers with two or three authors (e.g. C:CouHar20) and the first letter of each name for papers with four or more authors (e.g. CCS:BCGIKRS19).
- year is the last two digits of the year (e.g. 21 for 2021).