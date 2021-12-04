file = open('input2.txt')

lines = file.readlines()

file.close()

distance = 0
depth = 0

for raw_line in lines:
    line = raw_line.strip('\n')
    if line[0] == 'f':
        distance += int(line[-1])
    if line[0] == 'd':
        depth += int(line[-1])
    if line[0] == 'u':
        depth -= int(line[-1])

print(depth * distance)