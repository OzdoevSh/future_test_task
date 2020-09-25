import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { ArrowDown, ArrowUp, ArrowDownUp } from 'react-bootstrap-icons';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import './BigData.css'


class BigData extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0,
      inf: props.inf,
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      isForm: false,
      isButton: true
    }
  }





  onClick = () => {
    this.setState({
      isForm: true,
      isButton: false
    });
  }



  onSubmit = (e) => {
    e.preventDefault()
    const {
      id,
      firstName,
      lastName,
      email,
      phone,
      inf,
    } = this.state
    const newInf = inf
    newInf.unshift({ id, firstName, lastName, email, phone })
    this.setState({
      inf: newInf

    },

    )
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })

  }



  render() {
    const {
      inf,
    } = this.state

    const pagination = paginationFactory({
      sizePerPage: 50,
      hideSizePerPage: true

    });

    const columns = [{
      dataField: 'id',
      text: 'ID',
      filter: textFilter(),
      sort: true,
      sortCaret: (order) => {
        if (order === 'desc') {
          return (

            <ArrowDown className="sort-arrow" />
          )
        } else if (order === 'asc') {
          return (
            <ArrowUp className="sort-arrow" />
          )
        } else {
          return (
            <ArrowDownUp className="sort-arrow" />
          )
        }
      }


    }, {
      dataField: 'firstName',
      text: 'firstName',
      filter: textFilter()
    }, {
      dataField: 'lastName',
      text: 'lastName',
      filter: textFilter()
    }, {
      dataField: 'email',
      text: 'email',
      filter: textFilter()
    }, {
      dataField: 'phone',
      text: 'phone',
      filter: textFilter()
    },

    ];

    const expandRow = {
      showExpandColumn: false,
      renderer: row => (
        <div>
          <h5><b>Выбран пользователь:</b> {row.firstName + ' ' + row.lastName}</h5>
          <li><b>Описание:</b> {row.description}</li>
          <li><b>Адрес проживания:</b> {row.address.streetAddress}</li>
          <li><b>Город:</b> {row.address.city}</li>
          <li><b>Провинция/штат:</b> {row.address.state}</li>
          <li><b>Индекс:</b> {row.address.zip}</li>
        </div>
      )
    };


    return (
      <div >
        {this.state.isForm ?
          <form>
            <div className="formBigData">
              <div className="form-group"><input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="Ввведите имя" /></div>
              <div className="form-group"><input type="text" className="form-control" name="id" value={this.state.id} onChange={this.handleChange} placeholder="Ввведите ID" /></div>
              <div className="form-group"><input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Ввведите фамилию" /></div>
              <div className="form-group"><input type="text" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Ввведите электронную почту" /></div>
              <div className="form-group"><input type="text" className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="Ввведите номер телефона" /></div>
            </div>
            <div className="addToTheTable"><button className="btn btn-primary" onClick={this.onSubmit} type="submit">Добавить в таблицу</button></div>
          </form> : null}

        <div className="addDataClass">{this.state.isButton ? <button className="btn btn-primary" onClick={this.onClick}>Добавить данные</button> : null}</div>

        <BootstrapTable keyField='description' data={inf} columns={columns} pagination={pagination} filter={filterFactory()} expandRow={expandRow} />
      </div>
    );
  }
}

export default BigData;
