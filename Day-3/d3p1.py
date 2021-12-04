file = open('Day-3\\input3.txt')

raw_lines = file.readlines()
lines = []

for line in raw_lines:
    lines.append(line.strip('\n'))

file.close()

gamma = ''
epsilon = ''

def find_common(i):
    total = 0
    
    for line in lines:
        total += int(line[i])
    
    if total > len(lines) / 2:
        return '1'
    
    else:
        return '0'

def binary_converter(binary):
    b_10 = 0

    for i in range(len(binary)):
        digit = int(binary[i])

        b_10 += digit * (2 ** (len(binary) - 1 - i))

    return(b_10)

for i in range(12):
    gamma += find_common(i)

for char in gamma:
    if char == '1':
        epsilon += '0'
    
    if char == '0':
        epsilon += '1'

print(binary_converter(gamma) * binary_converter(epsilon))