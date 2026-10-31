import sys
import os
import uvicorn

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

if __name__ == "__main__":
    uvicorn.run("gaplens.api.server:app", host="0.0.0.0", port=8000, reload=False)

