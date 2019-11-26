/* eslint-disable */
import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../../actions/request'
import { Modal, Button, Rate } from 'antd'

const confirm = Modal.confirm;

const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

class Comments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            loading: false,
            starValue: 0
        }
    }

    showDeleteConfirm = (comment) => {
        var user = {
            avatar: comment.user.avatar,
            email: comment.user.email,
            fullname: comment.user.fullname,
            id: comment.user.id,
        }
        var data = {
            createTime: comment.createTime,
            updateTime: comment.updateTime,
            content: comment.content,
            star: comment.star,
            projectid: comment.projectid,
            user,
            _id: comment._id
        }
        confirm({
            title: 'Bạn có muốn xóa bình luận này?',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Trở về',
            onOk: () => {
                this.props.onDeletingComment(data._id, data)
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }

    handleChangeRating = (starvalue) => {
        this.setState({ starValue: starvalue })
        // return document.getElementsByClassName("ratingStar").value
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (comment) => {
        var user = {
            avatar: comment.user.avatar,
            email: comment.user.email,
            fullname: comment.user.fullname,
            id: comment.user.id,
        }
        var data = {
            createTime: comment.createTime,
            updateTime: moment().unix(),
            content: document.getElementById('commentEdit').value,
            star: this.state.starValue === 0 ? comment.star : this.state.starValue,
            projectid: comment.projectid,
            user,
            _id: comment._id
        }
        // var id = comment._id
        // console.log(data)
        this.props.onEditingComment(data._id, data)
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 1500);
    };

    handleCancel = () => {
        this.setState({ visible: false });

    };

    onHandleStars = (starsNumber) => {
        var result = []
        for (var i = 0; i < starsNumber; i++) {
            result.push(<i key={i} className="fa fa-star" />)
        }
        for (var j = 0; j < 5 - starsNumber; j++) {
            result.push(<i key={i + j} className="fa fa-star-o" />)
        }
        return result
    }

    onShowCommentHandle = (comment) => {
        if (localStorage.getItem('res') === undefined || localStorage.getItem('res') === null)
            return null
        else if (localStorage.getItem('res') !== null && comment.user.id === JSON.parse(localStorage.getItem('res')).user._id) {
            return (
                <React.Fragment>
                    <div className="comment-meta-reply">
                        <a onClick={this.showModal}>Sửa</a>
                    </div>
                    <div className="comment-meta-reply">
                        <a style={{ backgroundColor: "red" }} onClick={() => this.showDeleteConfirm(comment)}>Xóa</a>
                    </div>
                </React.Fragment>
            )
        }
    }

    render() {
        let { comment } = this.props
        let { visible, loading, starValue } = this.state
        return (
            <li>
                <div className="comment">
                    <div className="comment-author">
                        <a href="true">
                            <img src={localStorage.getItem('avatar') ? localStorage.getItem('avatar') : comment.user.avatar} alt="avatar-5" />
                        </a>
                    </div>
                    <div className="comment-content">
                        <div className="comment-meta">
                            <div className="comment-meta-author">
                                {comment.user.fullname}
                            </div>
                            {this.onShowCommentHandle(comment)}
                            <div className="comment-meta-date">
                                <span className="hidden-xs">{moment.unix(comment.updateTime).format('DD/MM/YYYY, h:mm a')}</span>
                            </div>

                        </div>
                        <div className="clearfix" />
                        <div className="comment-body">
                            <div className="comment-rating">
                                {this.onHandleStars(comment.star)}
                            </div>
                            <p>{comment.content}</p>
                        </div>
                    </div>
                </div>

                <Modal
                    visible={visible}
                    style={{ top: 20, height: "60%", boxShadow: "0 1px 1px rgba(0,0,0,0.30), 0 1px 1px rgba(0,0,0,0.22)" }}
                    title="Comment Editing"
                    onOk={() => this.handleOk(comment)}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Trở lại
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={() => this.handleOk(comment)}>
                            Lưu thay đổi
                        </Button>,
                    ]}
                >
                    <form>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <span>
                                    <Rate tooltips={desc} onChange={this.handleChangeRating} style={{ color: "yellow" }} className="ratingStar" defaultValue={comment.star} />
                                    {starValue ? <span className="ant-rate-text">{desc[starValue - 1]}</span> : ''}
                                </span>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group message">
                                    <textarea
                                        className="input-text"
                                        id="commentEdit"
                                        name="content"
                                        placeholder="Nhập bình luận vào đây..."
                                        defaultValue={comment.content}
                                        style={{ width: "470px", minHeight: "200px" }}
                                        onChange={this.onHandleChangeComment}
                                        required
                                    />
                                </div>
                            </div>
                            {/* <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="form-group send-btn mb-0">
                                <Button type="primary" onClick={() => { this.onPostingComments(info) }}>Đăng bình luận</Button>
                            </div>
                        </div> */}
                        </div>
                    </form>
                </Modal>
            </li>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditingComment: (id, data) => dispatch(actions.actEditCommentRequest(id, data)),
        onDeletingComment: (id, data) => dispatch(actions.actDeleteCommentRequest(id, data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments)