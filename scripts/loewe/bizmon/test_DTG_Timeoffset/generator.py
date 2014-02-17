#!/usr/bin/python

from mako.template import Template
from mako.lookup import TemplateLookup

mylookup = TemplateLookup(directories=['./', '../common'])

mytemplate = Template("""<%include file="tmpl.html"/>""", lookup=mylookup)
print mytemplate.render()

