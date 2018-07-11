import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import FileDrop from 'react-file-drop';

//css
import './StepUploader.css'

class StepUploader extends React.Component {
    state = {
        activeStep: 0
    };

    handleDrop = (files, event) => {
        console.log(files[0].name);
    }

    handleReset = () => {
        this.setState({
          activeStep: 0,
        });
    };

    getStepContent = (step) => {
        switch (step) {
          case 0:
            return 'Select pdf Document';
          case 1:
            return 'Upload Document';
          case 2:
            return 'Map Data';
          default:
            return 'Unknown step';
        }
    }

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
          activeStep: activeStep - 1,
        });
    };


    handleNext = () => {
        const { activeStep } = this.state;
        if(this.state.activeStep === 2) {
            this.props.history.push('/');
        } else {
            this.setState({
                activeStep: activeStep + 1
            });
        }
    };

    render() {
        const steps = ['Select pdf Document', 'Upload Document', 'Map Data']
        const { activeStep } = this.state;
        return(
            <div>
                <Stepper activeStep={activeStep}>
                { 
                    steps.map((label, index) => {
                        const props = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...props}>
                              <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })
                }
                </Stepper>
                <div>
                    {
                        activeStep === 0 ? (
                            <div id="react-file-drop-demo" className='dnd-uploader'>
                                <FileDrop onDrop={this.handleDrop}>
                                Drop some files here!
                                </FileDrop>
                            </div>
                        ): null
                    }
                </div>
                <div>
                    {activeStep === steps.length ? (
                    <div>
                        <Typography >
                            All steps completed - you&quot;re finished
                        </Typography>
                        <Button onClick={this.handleReset} >
                            Reset
                        </Button>
                    </div>
                    ):
                    (
                        <div>
                            <Typography >{this.getStepContent(activeStep)}</Typography>
                            <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                            >
                                Back
                            </Button>


                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>


                            </div>
                        </div>
                        
                    )    
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(StepUploader);