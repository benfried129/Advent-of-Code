file = open('Day-1\\input.txt')

lines = file.readlines()

file.close()

decrease_count = 0

for i in range(len(lines) - 3):
    if int(lines[i + 3]) > int(lines[i]):
        decrease_count += 1

print(decrease_count)
