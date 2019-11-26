import React, { Component } from 'react'
import { Modal, Button } from 'antd'

export default class TagsInput extends Component {
    constructor() {
        super();

        this.state = {
            tags: [
                'Tags',
                'Input'
            ],
            visible: this.props.visible
        };
    }

    removeTag = (i) => {
        const newTags = [...this.state.tags];
        newTags.splice(i, 1);
        this.setState({ tags: newTags });
    }

    inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({ tags: [...this.state.tags, val] });
            this.tagInput.value = null;
        } else if (e.key === 'Ba ckspace' && !val) {
            this.removeTag(this.state.tags.length - 1);
        }
    }

    handleOk = () => {

    }
    render() {
        const { tags } = this.state;

        return (
            <Modal
                title="Nhập mã số"
                style={{ top: 20 }}
                visible={this.state.visible}
                onOk={() => this.setModal1Visible(false)}
                onCancel={() => this.setModal1Visible(false)}
                footer={[
                    <Button key="back">
                        Return
                    </Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <div className="input-tag"
                    style={{
                        background: "white",
                        border: "1px solid #d6d6d6",
                        borderRadius: "2px",
                        display: "flex",
                        flexWrap: "wrap",
                        padding: "5px 5px 0"
                    }}
                >
                    <ul
                        className="input-tag__tags"
                        style={{
                            display: "inline-flex",
                            flexWrap: "wrap",
                            margin: "0",
                            padding: "0",
                            width: "100%"
                        }}
                    >
                        {tags.map((tag, i) => (
                            <li
                                key={tag}
                                style={{
                                    alignItems: "center",
                                    background: "#85A3BF",
                                    borderRadius: "2px",
                                    color: "white",
                                    display: "flex",
                                    fontWeight: "300",
                                    listStyle: "none",
                                    marginBottom: "5px",
                                    marginRight: "5px",
                                    padding: "5px 10px"
                                }}
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => { this.removeTag(i); }}
                                    style={{
                                        alignItems: "center",
                                        appearance: "none",
                                        background: "#333333",
                                        border: "none",
                                        borderRadius: "50%",
                                        color: "white",
                                        cursor: "pointer",
                                        display: "inline-flex",
                                        fontSize: "12px",
                                        height: "15px",
                                        justifyContent: "center",
                                        lineHeight: "0",
                                        marginLeft: "8px",
                                        transform: "rotate(45deg)",
                                        width: "15px"
                                    }}
                                >
                                    +
                            </button>
                            </li>
                        ))}
                        <li
                            className="input-tag__tags__input"
                            style={{
                                background: "none",
                                flexGrow: "1",
                                padding: "0"
                            }}
                        >
                            <input
                                type="text"
                                onKeyDown={this.inputKeyDown}
                                ref={c => { this.tagInput = c; }}
                                style={{ border: "none", width: "100%" }}
                            />

                        </li>
                    </ul>
                </div>
            </Modal>

        );
    }
}
