file = open('Day-3\\input3.txt')

raw_lines = file.readlines()
lines = []

for line in raw_lines:
    lines.append(line.strip('\n'))

file.close()


def oxy_digit(i, data):
    total = 0
    
    for line in data:
        total += int(line[i])
    
    if total >= len(data) / 2:
        return '1'
    
    else:
        return '0'

def co2_digit(i, data):
    total = 0
    
    for line in data:
        total += int(line[i])
    
    if total < len(data) / 2:
        return '1'
    
    else:
        return '0'

def binary_converter(binary):
    b_10 = 0

    for i in range(len(binary)):
        digit = int(binary[i])

        b_10 += digit * (2 ** (len(binary) - 1 - i))

    return(b_10)

def filter_list(data, comparer, i):
    if len(data) == 1:
        return data[0]

    new_list = []

    key = comparer(i, data)

    for line in data:
        if line[i] == key:
            new_list.append(line)

    return filter_list(new_list, comparer, i + 1)

print(binary_converter(filter_list(lines, co2_digit, 0)) * binary_converter(filter_list(lines, oxy_digit, 0)))
