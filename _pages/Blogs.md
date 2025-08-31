---
title:  "Blog"
layout: archive
classes: wide
author_profile: false
sidebar:
  title: "Search through the blog"
  nav: sidebar-blog
permalink: /blog/
comments: false
---

A collection of useful ressources, pointers, and notes.

{% for post in site.posts %}
	{% include archive-single.html %}
{% endfor %}