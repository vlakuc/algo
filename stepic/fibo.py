def get_number(n):
    if n == 0:
        return 0
    a = 0
    b = 1
    c = 1
    for i in range(n-1):
        c = a + b
        a = b
        b = c
    return c

print get_number(4)
