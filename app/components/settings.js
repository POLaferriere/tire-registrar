import React from 'react';
import FileProcessor from 'react-file-processor';
import Parse from 'parse';
import $ from 'jquery';

const Settings = React.createClass({
	componentWillMount() {
		const logo = session.get('currentUser').get('logo')
		this.setState({
			logo: logo,
			file: null,
		})
	},

	handleClick() {
		this.refs.fileInput.chooseFile();
	},

	handleFileSelect(e, file) {
		file = file[0];
		this.setState({file: file});
	},

	handleUpload() {
		const name = this.state.file.name
		const parseFile = new Parse.File(name, this.state.file)
		parseFile.save().then((res) => {
			$.ajax({
				url: 'https://api.parse.com/1/users/' + session.get('currentUser').get('objectId'),
				method: 'PUT',
				data: JSON.stringify({
					logo: {
						name: res._name,
						__type: 'File'
					}
				})
			})
			this.setState({
				logo: {
					name: res._name,
					url: res._url,
				}
			})
			session.get('currentUser').get('logo').url = res._url;
		}, () => {console.log('error')});
	},

	render() {
		const name = (!!this.state.file && this.state.file.name) || ''; 
		const logo = this.state.logo && this.state.logo.url || ''
		const logoStyle = {
			maxHeight: '300px'
		}
		return (
			<div className="settings-container">
				<h1>Settings</h1>
				<h4>Current logo</h4>
				<img className='settings-logo' src={logo} style={logoStyle} />
				<FileProcessor onFileSelect={this.handleFileSelect} ref='fileInput'>
					<button className='select-file'onClick={this.handleClick}>Select File</button>
					<p className='selected-file'>{'Selected File: ' + name}</p>
					<button className='upload-file' onClick={this.handleUpload}>Upload File</button>
				</FileProcessor>
			</div>
		)
	}
})

export default Settings;