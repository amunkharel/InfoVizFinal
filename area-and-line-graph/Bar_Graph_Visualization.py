#import altair.vegalite as vl
#vl.markCircle()
import altair as alt
import pandas as pd
from altair import datum
#import altair_viewer
alt.renderers.enable('altair_viewer')

# load a simple dataset as a pandas DataFrame
from vega_datasets import data
dt = pd.read_csv ('Crash_Data.csv')
dt.drop(dt.tail(987000).index,inplace = True)
dt['Cause of Crash'] = dt['MOST_HARMFUL_CRASH_EVENT_CD'].str.split(";", expand=True)[0]
dt = dt[dt['Cause of Crash'] != '20. Motor Vehicle In Transport']
df2 = dt.groupby(['Cause of Crash'])['Cause of Crash'].count().reset_index(name="count")
print("printing")
print(df2)
#cars = data.cars()
#dt['Population Increase'] = dt['Net Change']-dt['Migrants (net)']

chart = alt.Chart(df2,title='Virgnia Car Crash Causes').mark_bar().encode(
    x='Cause of Crash',
    y='count',
)

#.transform_filter('Cause of Crash' != '20. Motor Vehicle In Transport')

chart.show()