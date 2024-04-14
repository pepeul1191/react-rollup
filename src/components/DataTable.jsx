import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import './DataTable.css';

class DataTable extends Component {
  constructor(props) {
    //console.log(props)
    super(props);
    this.state = {
      id: '',
      fetchURL: props.fetchURL,
      trs: props.trs,
      ths: props.ths,
      message: '',
      messageClass: '',
      disabled: false,
      isValidJWT: false,
      data: [],
      rowKeyId: (props.rowKeyId !== null && props.rowKeyId !== undefined) ? props.rowKeyId : 'id',
      observer: { new: [], edit: [], delete: []},
      buttonAddRow: (props.buttonAddRow !== null && props.buttonAddRow !== undefined) ? props.buttonAddRow : false,
      rowButtons: (props.rowButtons !== null && props.rowButtons !== undefined) ? props.rowButtons : [],
    };
    this.userInputRef = React.createRef();
  }

  componentDidMount() {
    
  }

  fetchList() {
    const { fetchURL, data } = this.state;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', fetchURL, true);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        var data = JSON.parse(xhr.responseText);
        console.log('Datos recibidos:', data);
        this.setState({
          data: data,
        });
      } else {
        console.error('Error al realizar la solicitud:', xhr.statusText);
      }
    };
    xhr.onerror = () => {
      console.error('Error de red al realizar la solicitud');
    };
    xhr.send();
  }

  submit = (event) => {
    event.preventDefault();
  };

  observerSearch = (key, idSearched, observerArray) => {
    for (var i=0; i < observerArray.length; i++) {
      if (observerArray[i][key] == idSearched) {
        return observerArray[i];
      }
    }
    return false;
  }

  handleInputChange = (e, rowKey) => {
    const { data, rowKeyId, observer } = this.state;
    const rowId = e.target.parentNode.parentNode.firstChild.innerHTML;
    // console.log(rowId);
    // console.log(rowKey);
    data.forEach((element) => {
      if(element[rowKeyId] == rowId){
        element[rowKey] = e.target.value;
      }
      // observer
      if(String(rowId).includes('tmp')){
        if(this.observerSearch(rowKeyId, rowId, observer.new) == false){
          observer.new.push({[rowKeyId]: rowId})
          this.setState({ 
            observer: observer
          });
        }
      }else{
        if(this.observerSearch(rowKeyId, rowId, observer.edit) == false){
          observer.edit.push({[rowKeyId]: rowId})
          this.setState({ 
            observer: observer
          });
        }
      }
    });
    // update table's data
    this.setState({ 
      data: data
    });
  };

  deleteRow = (e) => {
    const { data, rowKeyId, observer } = this.state;
    const rowId = e.target.parentNode.parentNode.firstChild.innerHTML;
    //console.log(rowId);
    var tmpData = [];
    data.forEach((element) => {
      if(element[rowKeyId] != rowId){
        tmpData.push(element)
      }
      // observer
      if(this.observerSearch(rowKeyId, rowId, observer.new) != false){
        var tmp = {[rowKeyId]: rowId};
        observer.new = observer.new.filter(item => JSON.stringify(item) !== JSON.stringify(tmp));
      }
      if(this.observerSearch(rowKeyId, rowId, observer.edit) != false){
        var tmp = {[rowKeyId]: rowId};
        observer.edit = observer.edit.filter(item => JSON.stringify(item) !== JSON.stringify(tmp));
        if(this.observerSearch(rowKeyId, rowId, observer.delete) == false){
          observer.delete.push({[rowKeyId]: rowId});
        }
      }
      if(this.observerSearch(rowKeyId, rowId, observer.delete) == false){
        observer.delete.push({[rowKeyId]: rowId});
      }
    });
    // update table's data
    this.setState({ 
      data: tmpData
    });
  }

  render() {
    const { fetchURL, ths, data, trs, buttonAddRow, rowButtons } = this.state;
    return (
      <>
        <Table striped hover>
          <thead>
            <tr>
              {ths.map((th, index) => (
                <th key={index} style={th.style}>{th.caption}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((record, rowIndex) => (
              <tr key={rowIndex}>
                {/* data td */}
                {trs.map((row, colIndex) => {
                  if (row.type === 'id') {
                    return (
                      <td key={colIndex} style={row.style}>{record[row.key]}</td>
                    );
                  } else if (row.type === 'input[text]') {
                    return (
                      <td key={colIndex} style={row.style}>
                        <input 
                          type="text" 
                          name="" id="" 
                          value={record[row.key]} 
                          onChange={(e) => this.handleInputChange(e, row.key)}
                          className="inputText"
                        />
                      </td>
                    );
                  } else {
                    return (
                      <td key={colIndex} style={row.style}>{record[row.key]}</td>
                    );
                  }
                })}
                {/* button td */}
                {rowButtons == [] || ( 
                  <td>
                    {rowButtons.map((button, colIndex) => {
                      if (button.type === 'delete') {
                        return (
                          <i key={colIndex} className="fa fa-times hover" style={button.style} aria-hidden="true" onClick={(e) => this.deleteRow(e)}></i>
                        );
                      } else if (button.type === 'custom') {
                        return (
                          <i key={colIndex} className="fa fa-times" style={button.style} aria-hidden="true"></i>
                        );
                      } else if (button.type === 'link') {
                        return (
                          <i key={colIndex} className="fa fa-times" style={button.style} aria-hidden="true"></i>
                        );
                      }
                    })}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          {!buttonAddRow || ( 
            <tfoot>
              <tr>
                <td colSpan="5" style={{textAlign:'right'}}>
                  {(buttonAddRow) && (
                    <button className="btn btn-primary"> <i className="fa fa-plus" style={{marginRight:'5px'}}></i>Agregar Registro</button>
                  )}
                </td>
              </tr>
            </tfoot>
          )}
        </Table>
      </>
    );
  }
}

export default DataTable;
