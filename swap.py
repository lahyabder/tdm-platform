import sys

with open('src/app/[locale]/(public)/about/page.tsx', 'r') as f:
    content = f.read()

header_start = content.find('                {/* 1. Institutional Hero Header */}')
header_end = content.find('                {/* 2. Director\'s Word - The Golden Card */}')

if header_start == -1 or header_end == -1:
    print("Could not find header boundaries")
    sys.exit(1)

director_start = header_end
director_end = content.find('                {/* 3. Strategic Grid */}')

if director_start == -1 or director_end == -1:
    print("Could not find director boundaries")
    sys.exit(1)

header_block = content[header_start:header_end]
director_block = content[director_start:director_end]

# Add a little margin bottom to header since it's now below director
new_director_block = director_block.replace('mb-16', 'mb-24')
new_header_block = header_block.replace('mb-12', 'mb-24')

new_content = content[:header_start] + new_director_block + new_header_block + content[director_end:]

with open('src/app/[locale]/(public)/about/page.tsx', 'w') as f:
    f.write(new_content)

print("Swapped successfully.")
