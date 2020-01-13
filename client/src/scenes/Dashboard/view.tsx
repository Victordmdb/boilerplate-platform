import React from 'react';
import {
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiPanel,
  EuiIcon,
  EuiFlexGrid,
  EuiStat
} from '@elastic/eui';

import {
  DataGenerator,
} from '@elastic/charts';
import { capitalCase } from 'change-case';
import { PieChart, Pie } from "recharts";

type Currency = {
  amount : number;
  code : string;
}

const Gains : React.SFC<Currency> = ({ amount, code }) => <>
  <EuiPanel>
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiIcon size="xl" type='stats' />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
         title = { new Intl.NumberFormat('en-UK', { style: 'currency', currency: code }).format(amount) }
         description = "Net Share Gains"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </EuiPanel>
</>

const OnLoan : React.SFC<Currency> = ({ amount, code}) => <>
  <EuiPanel>
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiIcon size="xl" type='stats' />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
         title = { new Intl.NumberFormat('en-UK', { style: 'currency', currency: code }).format(amount) }
         description = "Current Value On Loan"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </EuiPanel>
</>

type AssetProps = {
  name : string;
  code : string;
  value :  Currency;
};

const AssetOverview : React.SFC<AssetProps> = ({name, code, value}) => <>
  <EuiPanel>
    <EuiText>
      <h5>{capitalCase(name)}</h5>
      <h6>{code.toLocaleUpperCase()}</h6>
      <EuiStat title={new Intl.NumberFormat('en-UK', { style: 'currency', currency: value.code }).format(value.amount)} description=""/>
    </EuiText>
  </EuiPanel>
</>;

type AnalyserProps = {
  data : Array<{
    name : string;
    value : number;
  }>
}

const Analyser : React.SFC<AnalyserProps> = ({data}) => <>
  <EuiPanel>
    <EuiText><h3>Analyser</h3></EuiText>
    <PieChart width={730} height={250}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
    </PieChart>
  </EuiPanel>
</>

const Assets = [
  {
    name : "Applied Materials, Inc",
    code : "AMAT",
    value : {
      amount : 3123123,
      code : "SGD"
    }
  },{
    name : "Applied Materials, Inc",
    code : "AMAT",
    value : {
      amount : 3123123,
      code : "SGD"
    }
  }
] as Array<AssetProps>;

const Home: React.SFC = () => {
  const dg = new DataGenerator();
  const totalGains = {
    amount : 812311231,
    code : "SGD"
  };
  const onLoan = {
    amount : 812311231,
    code : "SGD"
  };
  const data1 = dg.generateSimpleSeries(20, 1).map(({g,y})=>({name:g, value:y}));

  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem grow={false}>
        <EuiTitle><h2>Dashboard</h2></EuiTitle>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFlexGroup direction="column">
              <EuiFlexItem>
                <EuiFlexGroup >
                  <EuiFlexItem><Gains {...totalGains}/></EuiFlexItem>
                  <EuiFlexItem><OnLoan {...onLoan}/></EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFlexGrid>
                  <EuiFlexItem><EuiTitle><h3>Top Perfomers</h3></EuiTitle></EuiFlexItem>
                  {Assets.map(a => <EuiFlexItem><AssetOverview {...a} /></EuiFlexItem>)}
                </EuiFlexGrid>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <Analyser data={data1}/>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export default Home;
