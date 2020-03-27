import React from "react";
import { Pagination } from 'react-bootstrap'

export default class ReactPagination extends React.Component {
    state = {
        firstThreeArray: [1],
        lastNumber: "",
        showEllipis: true
    };
    componentDidMount() {
        if (this.props.totalPages <= 5) {
            var fArray = [];

            for (var i = 1; i <= this.props.totalPages; i++) {
                fArray.push(i);
            }

            this.setState({ firstThreeArray: fArray });
        } else {
            if (this.props.currentPage < 3) {
                this.setState({ firstThreeArray: [1, 2, 3] });
            } else {
                var fArray = [];
                var index = 1;
                for (let j = this.props.currentPage; j >= 0; j--) {
                    fArray.push(j);
                    if (index === 3) {
                        break;
                    }
                    index++;
                }

                fArray.reverse();
                this.setState({ firstThreeArray: fArray });
            }
            this.setState({ lastNumber: this.props.totalPages });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.totalPages <= 5) {
            var fArray = [];

            for (var i = 1; i <= nextProps.totalPages; i++) {
                fArray.push(i);
            }
            this.setState({ firstThreeArray: fArray });
        } else {
            if (
                this.props.currentPage !== nextProps.currentPage ||
                this.props.totalPages !== nextProps.totalPages
            ) {
                if (nextProps.currentPage < 3) {
                    this.setState({ firstThreeArray: [1, 2, 3] });
                } else {
                    var fArray = [];
                    fArray.push(nextProps.currentPage - 1);
                    fArray.push(nextProps.currentPage);
                    if (nextProps.currentPage + 1 < nextProps.totalPages) {
                        fArray.push(nextProps.currentPage + 1);
                    }
                    if (
                        nextProps.currentPage == nextProps.totalPages - 2 ||
                        nextProps.currentPage == nextProps.totalPages - 1 ||
                        nextProps.currentPage == nextProps.totalPages
                    ) {
                        this.setState({ showEllipis: false });
                    } else {
                        this.setState({ showEllipis: true });
                    }
                    this.setState({ firstThreeArray: fArray });
                }
                this.setState({ lastNumber: nextProps.totalPages });
            }
        }
    }
    prev = () => {
        if (this.props.currentPage > 1) {
            this.props.changeCurrentPage(this.props.currentPage - 1);
        }
    };
    next = () => {
        if (this.props.currentPage < this.props.totalPages) {
            this.props.changeCurrentPage(this.props.currentPage + 1);
        }
    };
    changeCurrentPage = no => {
        this.props.changeCurrentPage(no);
    };
    showEllipsis = () => {
        if (this.state.showEllipis) {
            return (
                <Pagination.Ellipsis />
            );
        }
    };
    showEllipsisFirstPagi = () => {
        // if (this.state.showEllipis) {
        return (
            <Pagination.Ellipsis />
        );
        // }
    };
    isactive = currentPage => {
        if (this.props.currentPage == currentPage) {
            return true;
        }
        return false;
    };
    showFirstPagi = () => {
        // if (this.props.currentPage !== this.props.totalPages) {
        return (
            <Pagination.Item
                // className={this.isactive(1) ? "is-active" : ""}
                onClick={() => {
                    this.changeCurrentPage(1);
                }}
            >
                {1}

            </Pagination.Item>
        );
        // }
    };
    showLastPagi = () => {
        if (this.props.currentPage !== this.props.totalPages) {
            return (
                <Pagination.Item
                    // className={this.isactive(this.props.totalPages) ? "is-active" : ""}
                    onClick={() => {
                        this.changeCurrentPage(this.props.totalPages);
                    }}
                >
                    {this.props.totalPages}
                </Pagination.Item>
            );
        }
    };
    showPrev = () => {
        if (this.props.currentPage != 1) {
            return (
                <Pagination.First onClick={this.prev} />

            );
        }
    };
    showNext = () => {
        if (this.props.currentPage < this.props.totalPages) {
            return (
                <Pagination.Next />
            );
        }
    };

    render() {
        return (
            <Pagination>
          
                    {this.showPrev()}
                    {this.props.totalPages <= 5 ? (
                        this.state.firstThreeArray.map((no, index) => {
                            return (
                                <Pagination.Item
                                    key={index}
                                    
                                    onClick={() => {
                                        this.changeCurrentPage(no);
                                    }}
                                >
                                    {no}
                                </Pagination.Item>
                            );
                        })
                    ) : (
                            <React.Fragment>
                                {this.props.currentPage < 3 ? null : this.showFirstPagi()}
                                {this.props.currentPage < 3 ? null : this.showEllipsisFirstPagi()}
                                {this.state.firstThreeArray.map((no, index) => {
                                    return (
                                        <Pagination.Item
                                            key={index}
                                            
                                            onClick={() => {
                                                this.changeCurrentPage(no);
                                            }}
                                        >
                                            {no}
                                        </Pagination.Item>
                                    );
                                })}
                                {this.showEllipsis()}

                                {this.showLastPagi()}
                            </React.Fragment>
                        )}
                    {this.showNext()}
       
            </Pagination>
        );
    }
}
ReactPagination.defaultProps = {
    theme: "default",
    currentPage: 1,
    totalPages: 15
};