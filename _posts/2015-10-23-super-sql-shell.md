---
layout: post
title:  "Django: Super debugsqlshell Shell"
date:   2015-11-19
has_excerpt: true
authors:
  - slug: dmuller
    name: David Muller
    title: Developer

tags:
  - Django ORM
  - SQL
  - django-debug-toolbar
  - django-extensions
---

When you're nearing the expressive limit of the Django ORM, it's often useful to open up a python shell and see exactly what SQL Django is generating for you.  `django-debug-toolbar` includes the [`debugsqlshell` command](https://django-debug-toolbar.readthedocs.org/en/1.4/commands.html#debugsqlshell) for printing out the SQL run in the django ORM -- making SQL exploration easy.

`debugsqlshell` can be a little plain, though -- we've grown used to the [`shell_plus` command](https://django-extensions.readthedocs.org/en/latest/shell_plus.html) from `django_extensions` for automatically importing all our models and tools.

For the best of both worlds, we put the two shells together in a third management command that imports all your django models and prints any SQL you run via the Django ORM:

<!--end-->

{% highlight python %}
"""
Defines a command that combines django_extension's shell_plus
command and debug_toolbar's debugsqlshell command.

Essentially this gives us the auto import magic of django extension's
shell_plus command and the pretty-sql printing and timing from
debug_toolbar's debusqlshell command
"""

from django_extensions.management.commands.shell_plus import Command  # noqa

# the following three lines are adapted from debug_toolbar's debugsqlshell
# see https://github.com/django-debug-toolbar/django-debug-toolbar/blob/master/debug_toolbar/management/commands/debugsqlshell.py
from django.db.backends import utils as db_backends_utils
from debug_toolbar.management.commands.debugsqlshell import PrintQueryWrapper

db_backends_utils.CursorDebugWrapper = PrintQueryWrapper
{% endhighlight %}


Note that the following two packages are required to run the above management command:

{% highlight python %}
pip install django-debug-toolbar==1.4
pip install django_extensions==1.5.9
{% endhighlight %}

I've used explicit version numbers becauase the above command is not part of the public APIs of `django-debug-toolbar` and `django-extensions` -- the code is subject to change as the respective packages evolve.
