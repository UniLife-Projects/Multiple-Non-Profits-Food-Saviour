## CHARTING TOOLS

### Django

- [ ] Chart.JS
- [ ] D3.JS
- [ ] Google Charts
- [ ] wq.app
- [ ] wq.db

---

### Flask

- [ ] Chart.JS
- [ ] D3.JS
- [ ] Google Charts
- [ ] Chartist.JS
- [ ] Matplotlib
- [ ] Plotly.py - Powered by Plotly.JS
- [ ] Highcharts

---

### Discussion

> As a result of my analysis, I have come to a conclusion that D3.js and Chart.js are worth comparing to evaluate which would be better for the project.

| PARAMETERS          | D3.js                                                                                                                       | Chart.js                                                                                                                                 | Google Charts                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Learning Curve**  | Significantly Steeper Learning Curve                                                                                        | Gentle Learning Curve                                                                                                                    | Gentle Learning Curve                                                                                                             |
| **Graphic Quality** | Integrates HTML, CSS and SVG, giving you data-driven graphics. Responsive and no loss in clarity across varying resolutions | Uses HTML canvas element, which produces **impoverished** bitmapped graphics Responsive though loss in clarity with changing resolutions | Integrates HTML and SVG to generate great responsive graphics                                                                     |
| **Loading speed**   | Slower and more susceptible to device limitations                                                                           | Fast and slick on more or less any device                                                                                                | Speed changes with regards to data size, 500 data-points take 200ms while 30,000 data-points have been recorded to take up to 30s |
| **Customization**   | We can create any graphs we want since there aren't any predefined graphs                                                   | Has predefined limited variety of graphs                                                                                                 | Limited variety of graph types                                                                                                    |
| **Input**           | Requires coding different aspects such as the interactivity, responsiveness and legend                                      | Requires declaring required inputs to generate charts                                                                                    | Just call the graph, enter the data correctly, customize the style and bingo.                                                     |

---

### FINAL VERDICT

#### 1. Time - Urgency

- **Ample Time** - D3.js
  - > Since it takes more time to learn D3.js and to code the logic that generates the graphs

- **Less Time** - Chart.js / Google Charts
  - > Since it takes less time to learn the ins and outs of Chart.js or Google Charts

#### 2. Variety

- **Less Variety** - Chart.js / Google Charts

  - > If all someone needs to do is generate general graph types: bar, line, area, scatter, radar, and pie

- **More Variety** - D3.js
  - > These are some graph types that can not be done with Chart.js or Google Charts: violin, boxplot, ridgeline, heatmap, correlogram, bubble (2D), wordcloud, lollipop, treemap, dendogram, maps, sankey, and edge bundling
    > -> **This list is not exhaustive**

#### 3. Customization - Control

- **Less Customization** - Chart.js / Google Charts

  - > Here all one has to do is paste the code from the official documentation for the required chart type, into their HTML or React render function. After this, add the data to the given fields

- **More Customization** - D3.js
  - > Things like creating the x-axis, the y-axis, the path, the legend, the labels, responsiveness and interactivity are all up to the user. After this, ensuring all these work well together is another part of the battle. Thankfully, there is ample documentation and support for all of this

---
