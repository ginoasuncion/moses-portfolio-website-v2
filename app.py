from flask import Flask, render_template

app = Flask(__name__)

# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route for Thorn Tree 2.0 case study
@app.route('/thorn-tree')
def thorn_tree():
    return render_template('thorn_tree.html')

# Route for The Adaptive City case study
@app.route('/adaptive-city')
def adaptive_city():
    return render_template('adaptive_city.html')

if __name__ == "__main__":
    app.run(debug=True)
