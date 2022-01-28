import os
import json

def getImages(path):
    images = []
    for filename in os.listdir(path):
        if os.path.isfile(os.path.join(path, filename)):
            namePath = path[path.index("lib/") + len("lib/"):]
            images.append({
                "name": namePath + filename[0:filename.index(".png")],
                "src": path + filename
            })
        else:
            subImages = getImages(path + filename + "/")
            images.extend(subImages)
    return images

output = open("files.json", "w")
output.write(json.dumps(getImages("lib/")))
output.close()