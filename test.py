a = [1,2,3,4]
b = [3,4,5,6]

def is_overlap(a,b):
    l = max(a[0], b[0])
    r = min(a[1], b[1])

    return l <= r

print(f"Is there overlap between a: {a} and b: {b}? {is_overlap(a,b)}")
    