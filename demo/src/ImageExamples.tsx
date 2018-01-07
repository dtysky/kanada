/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Jan 2018
 * Description:
 */
import * as React from 'react';
import {Button, ButtonGroup} from 'hana-ui/dist/seeds/Button';
import {Image} from 'hana-ui/dist/seeds/Image';
import * as Text from 'hana-ui/dist/seeds/Text';
import {Form, FormItem, FormGroup} from 'hana-ui/dist/burgeon/Form';
import {Select, Option} from 'hana-ui/dist/seeds/Select';
import * as Switch from 'hana-ui/dist/seeds/Switch';
import {Postcard, PostcardGroup} from 'hana-ui/dist/seeds/Postcard';
import * as Card from 'hana-ui/dist/burgeon/Card';
import {Notifications} from 'hana-ui/dist/seeds/Notification';
import * as kanata from '../../src';

import {defaultImage, metaTable, metaTableKeys} from './examplesConfig';

type TMetaArg = {
  name: string,
  type: 'number' | 'ck' | 'image' | 'colorSpace' | 'position' | 'pixel' | 'boolean',
  value: any
};

type TMetaItem = {
  name: string,
  operation: kanata.TOperate,
  args: TMetaArg[]
};

const image = new kanata.ImageCore();

interface IStateTypes {
  url: string,
  src: string,
  region: kanata.TRegion,
  notification: {
    type?: string,
    content?: string,
    showClose?: boolean,
    duration?: number
  },
  operation: string
}

export default class ImageExamples extends React.Component<any, IStateTypes> {
  public state: IStateTypes = {
    url: defaultImage,
    src: '',
    region: [0, 0, 0, 0],
    notification: {},
    operation: metaTableKeys[0]
  };

  private metaItems: TMetaItem[] = [
    {
      name: 'grayscale',
      operation: kanata.grayscale(),
      args: []
    },
    {
      name: 'globalThreshold',
      operation: kanata.globalThreshold(100, 160),
      args: [
        {name: 'th', value: 100, type: 'number'},
        {name: 'th2', value: 160, type: 'number'}
      ]
    },
    // {
    //   name: 'colorInvert',
    //   operation: kanata.colorInvert(),
    //   args: []
    // }
  ];

  public componentDidMount() {
    image.fromURL(defaultImage)
      .then(img => {
          image.save();
          const [width, height] = image.size;

          this.setState({
            src: image.dataURL,
            region: [100, 100, width - 100, height - 100]
          });
      });
  }

  private handleSubmitURL = async (event, value: string) => {
    if (value === this.state.url) {
      return;
    }
    this.setState({url: value});
    try {
      await image.fromURL(value);
      const [width, height] = image.size;
      this.setState({
        src: image.dataURL,
        region: [100, 100, width - 100, height - 100]
      });
    } catch (error) {
      this.setState({
        notification: {
          type: 'error',
          content: error.message,
          showClose: true,
          duration: 4
        }
      });
    }
  }

  private handleChangeRegion = (index: number, value: number) => {
    const {region} = this.state;

    if ((index === 0 && value >= region[2]) || index === 1 && value >= region[3]) {
      return;
    }

    region[index] = value;
    this.setState({region});
  }

  private handleAddOperation = () => {
    const name = this.state.operation;
    const operation = metaTable[name];

    this.metaItems.push({
      name,
      operation: operation.operation(...operation.args.map(arg => arg[2])),
      args: operation.args.map(arg => ({
        name: arg[0],
        type: arg[1],
        value: arg[2]
      }))
    });

    this.forceUpdate();
  }

  private handleModifyOperation = (index: number) => {
    const operation = this.metaItems[index];
    const metaOperation = metaTable[operation.name].operation;

    const args = operation.args.map(async ({name, type, value}) => {
      switch (type) {
        case 'number':
        case 'boolean':
        case 'colorSpace':
        case 'position':
        case 'pixel':
          return value;
        case 'image': {
          const nImage = new kanata.ImageCore();
          try {
            await nImage.fromURL(value);
            return nImage;
          } catch (error) {
            this.setState({
              notification: {
                type: 'error',
                content: error.message,
                showClose: true,
                duration: 4
              }
            });
          }
        }
        case 'ck':
        default:
          return;
      }
    });

    operation.operation = metaOperation(...args);
  }

  private handleDeleteOperation = (index: number) => {
    this.metaItems.splice(index, 1);
    this.forceUpdate();
  }

  private handleRun = async () => {
    image.restore();
    image.clear();
    // generate pipeline
    this.metaItems.forEach(item => {
      image.pipe(item.operation);
    });

    // set region
    image.region = this.state.region;
    
    const s = performance.now();
    // exec
    image.exec();
    const duration = performance.now() - s;
    console.log('Performance', duration);

    image.pushDataBackToContext();
    this.setState({
      src: image.dataURL,
      notification: {
        type: 'success',
        content: `Processing done, duration: ${duration.toFixed(2)} ms`,
        showClose: true,
        duration: 3
      }
    });
  }
    
  public render() {
    return (
      <div>
        {this.renderImage()}
        {this.renderBase()}
        {this.renderOperations()}
        {this.renderMeta()}
        <Notifications
          notification={this.state.notification}
          onRequestClose={() => this.setState({notification: {}})}
        />
      </div>
    );
  }

  private renderImage() {
    const width = '48%';

    return (
      <PostcardGroup>
        <Postcard title="Pre processing" style={{width}}>
          <Image src={this.state.url} fullWidth />
        </Postcard>
        <Postcard title="Post processing" style={{width}}>
          <Image src={this.state.src} fullWidth />
        </Postcard>
      </PostcardGroup>
    );
  }

  private renderBase() {
    const {region} = this.state;

    return (
      <Card
        title={'Base config'}
        style={{marginTop: 24}}
        expand
        open
      >
        <Form>
          <FormItem label={'Image url:'}>
            <Text
              withIcon={false}
              type={'string'}
              defaultValue={defaultImage}
              auto
              onBlur={this.handleSubmitURL}
            />
          </FormItem>
          <FormGroup label={'Region:'} labelPosition={'left'}>
            {
              ['Left', 'Top', 'Right', 'Bottom'].map((label, index) => (
                <FormItem key={label} label={`${label}:`}>
                  <Text
                    value={region[index]}
                    withIcon={false}
                    type={'int'}
                    onChange={(e, v) => this.handleChangeRegion(index, v)}
                  />
                </FormItem>
              ))
            }
          </FormGroup>
        </Form>
      </Card>
    );
  }

  private renderOperations() {
    const {region, operation} = this.state;

    return (
      <Card
        title={'Operations'}
        style={{margin: '24px 0'}}
        expand
        open
      >
        <Button
          type={'primary'}
          icon={'himawari'}
          onClick={this.handleRun}
        >
          Run !
        </Button>
        <Button
          onClick={this.handleAddOperation}
          style={{marginLeft: 36, marginRight: 12}}
          icon={'plus'}
        >
          Add a operation
        </Button>
        <Select
          onSelect={value => this.setState({operation: value})}
          value={operation}
          style={{width: 240}}
        >
          {
            metaTableKeys.map(key => (
              <Option key={key} label={key} value={key} />
            ))
          }
        </Select>
      </Card>
    );
  }

  private renderMeta() {
    return (
      <div>
        {this.metaItems.map((item, index) => this.renderMetaItem(item, index))}
      </div>
    );
  }

  private renderMetaItem(item: TMetaItem, index: number) {
    const {name, args} = item;

    return (
      <Card
        key={index} title={`${index} - ${name}`}
        expand
        open
      >
        <Form>
          <FormGroup labelPosition={'left'}>
              {
                args.map(arg => (
                  <FormItem key={arg.name} label={arg.name}>{this.renderMetaArg(arg)}</FormItem>
                ))
              }
            </FormGroup>
        </Form>
        <Button
          type={'primary'}
          onClick={() => this.handleModifyOperation(index)}
          style={{marginRight: 12}}
        >
          Confirm modification
        </Button>
        <Button
          type={'error'}
          onClick={() => this.handleDeleteOperation(index)}
        >
          Delete
        </Button>
      </Card>
    );
  }

  private renderMetaArg(arg: TMetaArg) {
    const {name, type, value} = arg;

    switch (type) {
      case 'number':
        return (
          <Text
            withIcon={false}
            type={'int'}
            value={value}
            onChange={(event, val) => {
              arg.value = val;
              this.forceUpdate();
            }}
          />
        );
      case 'boolean':
        return (
          <Switch
            checked={value}
            onChange={checked => {
              arg.value = checked;
              this.forceUpdate();
            }}
          />
        );
      case 'image':
        return (
          <Text
            withIcon={false}
            type={'string'}
            auto
            onBlur={(event, val) => {
              arg.value = val;
              this.forceUpdate();
            }}
          />
        );
      case 'colorSpace':
        return (
          <Select
            onSelect={val => {
              arg.value = val;
              this.forceUpdate();
            }}
            value={value}
            style={{width: 240}}
          >
            {
              kanata.COLOR_SPACES.map(key => (
                <Option key={key} label={key} value={key} />
              ))
            }
          </Select>
        );
      case 'position':
        return (
          <div>
            <Text
              icon={'x'}
              type={'int'}
              auto
              onBlur={(event, val) => {
                arg.value[0] = val;
                this.forceUpdate();
              }}
            />
            <Text
              icon={'y'}
              type={'int'}
              auto
              onBlur={(event, val) => {
                arg.value[1] = val;
                this.forceUpdate();
              }}
            />
          </div>
        );
      case 'pixel':
      return (
          <div>
            <Text
              icon={'r'}
              type={'int'}
              auto
              onBlur={(event, val) => {
                arg.value[0] = val;
                this.forceUpdate();
              }}
            />
            <Text
              icon={'g'}
              type={'int'}
              auto
              onBlur={(event, val) => {
                arg.value[1] = val;
                this.forceUpdate();
              }}
            />
            <Text
              icon={'b'}
              type={'int'}
              auto
              onBlur={(event, val) => {
                arg.value[2] = val;
                this.forceUpdate();
              }}
            />
            <Text
              icon={'a'}
              type={'int'}
              auto
              onBlur={(event, val) => {
                arg.value[3] = val;
                this.forceUpdate();
              }}
            />
          </div>
        );
      case 'ck':
      default:
    }
  }
}
