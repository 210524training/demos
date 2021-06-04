# XML = eXtensible Markup Language
- Markup Language
    - Not a programming language
    - Generally to organize/display data
    - Not processing anything
- Language Agnostic
    - Not dependent upon a programming language to use
    - Any programming language can read/understand XML
- Designed to transport and store data in a way that is both machine and human readable
- Designed to be self-descriptive

## JSON vs XML
- JSON
    - Uses Key-Value Pairs
    - Less verbose
    - Smaller in size
    - Close to JavaScript
- XML
    - Uses Tags like a Markup Language
    - Support for meta data attributes
    - XPath and Namespaces

Main Takeaway
- You should use XML for document markup (if you need metadata)
- Otherwise, you should probably use JSON


### Well-Formed vs Valid XML
- Well-Formed: Follow basic syntax rules
    - Begins with XML declaration
        - Similar to HTML DOCTYPE declaration
    - Unique Root Element
    - Starting and Ending Tags match
    - Elements are case-sensitive
    - Elements are properly nested
- Valid: XML follows a predefined structure
    - XML follows rules that were set forth in another document
    - 2 types of documents that can act as "Validators"
        1. DTD: Document Type Definition
        2. XSD: XML Schema Definition
    - Effectively allows XML to have custom tags defined in the validator

Note: If you are valid, then you are also well-formed
If you are not well-formed, then you cannot be valid

### DTD
- Written in special DTD syntax
- Define elements and relationships
- Not necessarily written syntax
- Less control over the particular XML syntax

### XSD
- Written in XML
- Generally considered more powerful than DTDs (supports namespaces & metadata)
- Supports data types for elements
- Can declare fixed and default values

### XML Namespaces
- Anyone can create their own markup language with their own tags
- Namespaces allow us to differentiate between 2 different people using the same tag
- Common to use URI for a namespace
    - Links to where the namespace is defined
    - URI: Universal Resource Identifier
    - URL: Universal Resource Locator
        - Defines where something is

https://www.google.com/index.html
----------URI/URL----------------
        -web address--
                      ----URI----
-scheme-
        ----host-----
                     ----path----