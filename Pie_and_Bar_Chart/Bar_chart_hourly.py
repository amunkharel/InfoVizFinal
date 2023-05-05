# -*- coding: utf-8 -*-
"""
Created on Fri May  5 12:24:58 2023

@author: Kuldeep Dixit
"""

import pandas as pd
import numpy as np
import plotly.express as px

dfv = pd.read_csv('vehicle.zip',encoding='cp1252')
dfv['INCIDENTCOUNT'] = 1 # Variable tocount the number of crashes
dft = dfv.groupby('HOUR').sum().reset_index()

fig = px.bar(dft[dft.HOUR!=99], x='HOUR', y='INCIDENTCOUNT',title='Vehicle Crashes by Hour of Day (2020)',labels={'INCIDENTCOUNT':'Total Crashes'})
fig.show()
