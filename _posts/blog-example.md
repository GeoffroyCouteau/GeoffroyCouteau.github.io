---
title: "PCG"
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
categories:
  - Posts
tags:
  - PCG
---

<style>
div {
  text-align: justify;
  text-justify: inter-word;
}
</style>

# My Research on Pseudorandom Correlation Generators

This blog post explores the fascinating world of Pseudorandom Correlation Generators (PCGs) and their evolution in cryptographic research. Below is an interactive visualization of the key papers in this field and their relationships.

## Interactive Paper Tree

The following interactive tree shows the genealogy of papers in the PCG research area. You can:
- **Zoom in/out** using your mouse wheel or trackpad
- **Pan around** by clicking and dragging
- **Click on any node** to see detailed information about the paper

<div style="width: 100%; height: 600px; border: 2px solid #ddd; border-radius: 8px; overflow: hidden; margin: 20px 0;">
    <iframe 
        src="tree-embed.html" 
        width="100%" 
        height="100%" 
        frameborder="0"
        style="border: none;">
    </iframe>
</div>

## Key Insights from the Tree

Looking at this visualization, several interesting patterns emerge:

1. **Foundation Paper**: The tree starts with "Compressing Vector OLE" (Boyle et al., CCS 2018), which laid the groundwork for efficient vector oblivious linear evaluation.

2. **Major Breakthrough**: "Efficient Pseudorandom Correlation Generators: Silent OT Extension and More" (Boyle et al., CRYPTO 2019) represents a significant leap forward, introducing the core PCG framework.

3. **Branching Evolution**: From the core PCG paper, the research branched into several directions:
   - **Theoretical foundations** (red nodes): Exploring the mathematical underpinnings
   - **Practical implementations** (green nodes): Focusing on efficiency and real-world applications
   - **Extended applications** (yellow nodes): Applying PCGs to broader cryptographic problems
   - **Alternative constructions** (orange nodes): Exploring different approaches and optimizations

4. **Recent Developments**: The tree shows active research continuing into 2024-2025, with papers exploring new finite fields, improved efficiency, and novel applications.

## Embedding This Tree in Your Own Blog

If you want to embed this interactive tree in your own blog or website, you can use the following HTML:

```html
<div style="width: 100%; height: 600px; border: 2px solid #ddd; border-radius: 8px; overflow: hidden; margin: 20px 0;">
    <iframe 
        src="path/to/tree-embed.html" 
        width="100%" 
        height="100%" 
        frameborder="0"
        style="border: none;">
    </iframe>
</div>
```

Simply replace `"path/to/tree-embed.html"` with the actual path to your `tree-embed.html` file.

### Customizing the Data

To customize the tree with your own research area or papers:

1. Open `tree-embed.html` in a text editor
2. Find the `papers` array in the JavaScript section (around line 177)
3. Replace the paper data with your own research papers
4. Each paper should have the following structure:

```javascript
{
    id: 1,                    // Unique identifier
    title: "Paper Title",     // Full title of the paper
    authors: "Author1, Author2", // Comma-separated authors
    conference: "VENUE",      // Conference/journal abbreviation
    year: 2024,              // Publication year
    link: "https://...",     // Link to paper (optional)
    notes: "Any notes",      // Additional notes (optional)
    color: "#1abc9c",        // Node color (optional, hex code)
    parentId: null,          // ID of parent paper (null for root)
    x: 0,                    // X position for layout
    y: 0                     // Y position for layout
}
```

The positioning (x, y coordinates) determines the visual layout of your tree. You may need to experiment with these values to achieve the desired arrangement.

## Conclusion

This interactive visualization demonstrates how research builds upon itself, creating a rich ecosystem of interconnected ideas. The PCG research area exemplifies how a single foundational concept can spawn numerous research directions, each contributing to our understanding and practical capabilities in cryptography.

Feel free to explore the tree above and discover the fascinating relationships between these groundbreaking papers!