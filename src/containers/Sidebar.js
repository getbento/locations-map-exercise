import React from 'react';

import '../styles/sidebar.styl'

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {imageIndex: 0}
	}

	updateImageIndex() {
		const currentIndex = this.state.imageIndex
		const newIndex = (currentIndex + 1) % this.props.images.length
		this.setState({imageIndex: newIndex})
	}

	render() {
		const { name, address, hours, images } = this.props
		const { imageIndex } = this.state
		const image = images[imageIndex] 
		return (
			<div className="sidebar-container">
				<div className="sidebar-item">{name}</div>
				<div className="sidebar-item">{address}</div>
				{image && 
					<div className="sidebar-item">
						<img src={image.url} alt={image.alt_text} />
						{images.length > 1 && <button onClick={this.updateImageIndex.bind(this)}>Next Image</button>}
				</div>
				}
				<div className="sidebar-item">
					<div dangerouslySetInnerHTML={{__html: hours}} />
					</div>
			</div>
		)
	}
}

export default Sidebar;
