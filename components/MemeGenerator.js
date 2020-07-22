import React from 'react';

class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes").
        then(response => response.json()).
        then(response => {
            this.setState({ allMemeImgs : response.data.memes})
        })
        
    }
    handleSubmit(event) {
        event.preventDefault();
        const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randomMeme = this.state.allMemeImgs[randomNum].url
        this.setState({ randomImg : randomMeme})
    }
    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        name="topText" 
                        value={this.state.topText} 
                        type="text" 
                        placeholder="Top Text"
                        onChange={this.handleChange}>
                    </input>
                    <input 
                        name="bottomText" 
                        value={this.state.bottomText} 
                        type="text" 
                        placeholder="Bottom Text"
                        onChange={this.handleChange}>
                    </input>
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}
export default MemeGenerator;