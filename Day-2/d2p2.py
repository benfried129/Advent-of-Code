file = open('input2.txt')

lines = file.readlines()

file.close()

distance = 0
depth = 0
aim = 0

for raw_line in lines:
    line = raw_line.strip('\n')
    val = int(line[-1])

    if line[0] == 'f':
        distance += val
        depth += val * aim
    if line[0] == 'd':
        aim += val
    if line[0] == 'u':
        aim -= val

print(depth * distance)