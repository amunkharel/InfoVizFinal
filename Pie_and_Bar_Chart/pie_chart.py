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
dfsl = dfv.groupby('MAKENAME').sum().reset_index()

fig = px.pie(dfsl, values='INCIDENTCOUNT', names='MAKENAME',
             title='Vehicle Crashes by Make (2020)',
             hover_data=['INCIDENTCOUNT'], labels={'INCIDENTCOUNT':'Total Crashes'})
fig.update_traces(textposition='inside', textinfo='percent+label')
fig.show()
