#   blog app


#   useful references

*   using tailwind for styling coponents, so it overwrites browser default syling of element.
    now im also using `marked` which generates HTML out of github flavoured markdown. 
    trouble is, this generated markdown's styling is overwriten by tailwind and ofc marked dont support tailwind type styling while generating HTML.

    so there are two solutions, 

    1.  reset tailwind for particular div or component. (involves sass and stuf)
        blog: https://www.swyx.io/tailwind-unreset/
    
    2.  just use `<iframe srcDoc={markdown}>` to render markdown.
        iframes are independent of external styling and this is coolest!
        so imma gonna go with this one :)

