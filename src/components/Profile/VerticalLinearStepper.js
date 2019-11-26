import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StepConnector from '@material-ui/core/StepConnector';

const styles = theme => ({
    root: {
        width: '90%',
        fontSize: '15px',
        
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        height: 48,
        // padding: '0 10px',
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
    connectorActive: {
        '& $connectorLine': {
            borderColor: theme.palette.secondary.main,
        },
    },
    connectorCompleted: {
        '& $connectorLine': {
            borderColor: 'green',
        },
    },
    connectorDisabled: {
        '& $connectorLine': {
            borderColor: theme.palette.grey[100],
        },
    },
    connectorLine: {
        transition: theme.transitions.create('border-color'),
    },
});

function getSteps() {
    return ['Bước 1: Thỏa thuận mua ban đầu', 
            'Bước 2: Kiểm tra tính pháp lý của bất động sản', 
            'Bước 3: Đặt cọc', 
            'Bước 4: Ký hợp đồng', 
            'Bước 5: Công chứng hợp đồng',
            'Bước 6: Đóng thuế',
            'Bước 7: Giao bất động sản'
            ];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return (
                <input type="text" placeholder="Input something here"></input>
            )
        case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
        case 2:
            return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
        default:
            return 'Unknown step';
    }
}

class VerticalLinearStepper extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const connector = (
            <StepConnector
                classes={{
                    active: classes.connectorActive,
                    completed: classes.connectorCompleted,
                    disabled: classes.connectorDisabled,
                    line: classes.connectorLine,
                }}
            />
        );
        return (
            <div className={classes.root} >
                <Stepper activeStep={activeStep} orientation="vertical" connector={connector} style={{fontSize: "25px"}}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <Typography>{getStepContent(index)}</Typography>
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                            style={{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', fontSize: "10px"}}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </div>
        );
    }
}

VerticalLinearStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);
