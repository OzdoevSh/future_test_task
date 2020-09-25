import React from 'react';
import Form from './components/Form/Form';
import './App.css';

import SmallData from './components/SmallData';
import BigData from './components/BigData';
import LoadingIndicator from './components/LoadingIndicator'


class App extends React.Component {


  state = {
    inf: [{
      id: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      phone: undefined,
      address: {
        streetAddress: undefined,
        city: undefined,
        state: undefined,
        zip: undefined
      },
      description: undefined
    }],
    isSmallData: false,
    isBigData: false,
    getData: true,
    isLoading: false,
    isForm: true,

  }

  getSmallData = async (e) => {
    e.preventDefault();
    const small_data_url = await fetch(`http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`);
    const small_data = await small_data_url.json();
    console.log(small_data)


    this.setState(
      {
        inf: small_data,
        isSmallData: true,
        isBigData: false,
        isForm: false
      });
  }

  getBigData = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true })
    const big_data_url = await fetch(`http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`);
    const big_data = await big_data_url.json();

    this.setState({
      inf: big_data,
      isSmallData: false,
      isBigData: true,
      isLoading: false,
      isForm: false,
    })
  }


  render() {
    const {
      inf,
      isBigData,
      isSmallData,
      isLoading,
      isForm
    } = this.state

    return (
      <div>
        {isForm ? <Form isSmallData={isSmallData} isBigData={isBigData} smallDataMethod={this.getSmallData} bigDataMethod={this.getBigData} /> : null}

        {isSmallData ? <SmallData inf={inf} /> : null}
        {isLoading ? <LoadingIndicator /> : null}
        {isBigData ? <BigData inf={inf} /> : null}




      </div>)
  }
}

export default App;
