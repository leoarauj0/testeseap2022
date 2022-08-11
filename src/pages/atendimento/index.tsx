/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Header } from "../../components/Header";
import styles from "./home.module.scss";

import {
  Input,
  Button,
  Tooltip,
  Modal,
  Form,
  Radio,
  Spin,
  Popconfirm,
  Col,
  Row,
  Table,
  Select,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import {
  PicLeftOutlined,
  DownOutlined,
  UpOutlined,
  LoadingOutlined,
  ImportOutlined,
  LeftOutlined,
  RightOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

import onNotification from "../../components/Notificacao/Notificacao";

const rowProps = {
  gutter: 70,
};

const { Search } = Input;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

type Detento = {
  id: number;
  nome: string;
  unidade: string;
  nomeMae: string;
  cpf: string;
};

type Unidade = {
  descricao: string;
};

const { Option } = Select;

const Detentos: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [btnListarTodosVisivel, setBtnListarTodosVisivel] = useState(false);
  const [detentos, setDetentos] = useState([{} as Detento]);
  const [unidades, setUnidades] = useState([]);

  const [modalChamado, setModalChamado] = useState(false);

  const [detentoForm] = Form.useForm();
  const [atualizaDetentoForm] = Form.useForm();

  // const onSearch = async (id: any) => {
  //   form.resetFields();
  //   try {
  //     setLoading(true);
  //     const livro = livros.filter((item) => `${item.id}` === id);
  //     // const response = await api.get(`/livros/${id}`);

  //     setLivrosMapeados(livro);

  //     setBtnListarTodosVisivel(true);

  //     setLoading(false);
  //   } catch (err) {
  //     setLoading(false);
  //     onNotification("error", {
  //       message: "Erro!",
  //       description: "Erro ao buscar livro. Insira uma código válido",
  //     });
  //   }
  // };

  useEffect(() => {
    buscarDetentos();
    buscarUnidades();
  }, []);

  const buscarDetentos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/detentos`);
      setDetentos(response.data);
      setLoading(false);
    } catch (error) {
      onNotification("error", {
        message: "Erro ao carregar detentos!",
        description: "Tente novamente.",
      });
      setLoading(false);
    }
  }, []);

  const buscarUnidades = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/unidades`);
      setUnidades(response.data);
      setLoading(false);
    } catch (error) {
      onNotification("error", {
        message: "Erro ao carregar unidades!",
        description: "Tente novamente.",
      });
      setLoading(false);
    }
  }, []);

  const cadastrarDetento = useCallback(async (detentoForm: any) => {
    setLoading(true);
    try {
      const response = await api.post(`/detentos`, detentoForm);
      setUnidades(response.data);
      setLoading(false);
    } catch (error) {
      onNotification("error", {
        message: "Erro ao carregar unidades!",
        description: "Tente novamente.",
      });
      setLoading(false);
    }
  }, []);

  const atualizarDetento = useCallback(async (record: any) => {
    setLoading(true);
    try {
      const response = await api.put(
        `/detentos/${record.id}`,
        atualizaDetentoForm
      );
      setUnidades(response.data);
      setLoading(false);
    } catch (error) {
      onNotification("error", {
        message: "Erro ao carregar unidades!",
        description: "Tente novamente.",
      });
      setLoading(false);
    }
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
    },
    {
      title: "Unidade",
      dataIndex: "unidade",
      key: "unidade.id",
    },
    {
      title: "Nome da Mãe",
      dataIndex: "nomeMae",
      key: "nomeMae",
    },
    {
      title: "Editar",
      dataIndex: "",
      key: "editar",
      render: (record: any) => (
        <Tooltip placement="left" title="Editar">
          <Button
            type="primary"
            onClick={() => {
              atualizarDetento(record);
              // setModalChamado(true);
              // chamarSenha(item.id);
            }}
          >
            <EditOutlined />
          </Button>
        </Tooltip>
      ),
    },
  ];

  // const handleOk = (values) => {
  //   setModalChamado(false);
  //   form.resetFields();
  //   console.log(values);
  // };

  // const handleCancel = () => {
  //   setModalChamado(false);
  //   // form.resetFields();
  // };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sistema de Senhas Seap</title>
        <meta name="description" content="Generated by create next app" />
        {/* <link rel="icon" href="/logo.png" /> */}
      </Head>

      <Header login={false} />

      <div className={styles.wrapper}>
        <main>
          <div className={styles.homepage}>
            <Spin indicator={antIcon} spinning={loading}>
              <section className={styles.listaSenhas}>
                <br />
                <h2>Detentos</h2>
                <Row {...rowProps}>
                  <Col xs={24} sm={24} md={24}>
                    <div className={styles.caixa} style={{ height: "37vh" }}>
                      <Table dataSource={detentos} columns={columns} />
                    </div>
                  </Col>
                </Row>
                <br />
                <br />
              </section>
            </Spin>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Spin indicator={antIcon} spinning={loading}>
              <section className={styles.listaSenhas}>
                <br />
                <Row {...rowProps}>
                  <Col xs={24} sm={12} md={12}>
                    <Form
                      layout="vertical"
                      name="detento"
                      form={detentoForm}
                      labelCol={{ span: 10 }}
                      wrapperCol={{ span: 24 }}
                      initialValues={{ remember: true }}
                      onFinish={cadastrarDetento}
                      // onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <h2>Cadastrar Detento</h2>
                      <Form.Item
                        label="Nome"
                        name="nome"
                        rules={[
                          { required: true, message: "Informe seu nome!" },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Cpf"
                        name="cpf"
                        rules={[{ required: true, message: "Informe o cpf!" }]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Nome da Mae"
                        name="nomeMae"
                        rules={[
                          { required: true, message: "Informe o nome da mãe!" },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Unidade"
                        name="unidade"
                        rules={[
                          { required: true, message: "Informe a unidade!" },
                        ]}
                      >
                        <Select
                        // defaultValue="usuario"
                        // style={{ width: 120 }}
                        // onChange={handleChange}
                        >
                          {unidades.map((item: Unidade) => {
                            return (
                              <Option
                                key={item.descricao}
                                value={item.descricao}
                              >
                                {item.descricao}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>

                      <Form.Item
                      // wrapperCol={{ offset: 8, span: 16 }}
                      >
                        {/* <Link href={`/home`}> */}
                        <Button
                          // type="primary"
                          htmlType="submit"
                          style={{
                            background: "#003a8c",
                            color: "#fff",
                            width: "30%",
                            marginBottom: -50,
                          }}
                        >
                          Cadastrar
                        </Button>
                        {/* </Link> */}
                      </Form.Item>

                      {/* <Link href={``}>Registrar</Link> */}
                    </Form>
                  </Col>
                  {/* <Col xs={24} sm={12} md={12}>
                    <Form
                      layout="vertical"
                      name="detento"
                      form={detento}
                      labelCol={{ span: 10 }}
                      wrapperCol={{ span: 24 }}
                      initialValues={{ remember: true }}
                      // onFinish={cadastrarDetento}
                      // onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <h2>Atualizar Detento</h2>
                      <Form.Item
                        label="Nome"
                        name="nome"
                        rules={[
                          { required: true, message: "Informe seu nome!" },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Cpf"
                        name="cpf"
                        rules={[{ required: true, message: "Informe o cpf!" }]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Nome da Mae"
                        name="nomeMae"
                        rules={[
                          { required: true, message: "Informe o nome da mãe!" },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Unidade"
                        name="unidade"
                        rules={[
                          { required: true, message: "Informe a unidade!" },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                      // wrapperCol={{ offset: 8, span: 16 }}
                      >
                        {/* <Link href={`/home`}> */}
                  {/* <Button
                          type="primary"
                          htmlType="submit"
                          style={{
                            background: "#003a8c",
                            color: "#fff",
                            width: "30%",
                            marginBottom: -50,
                          }}
                        >
                          Entrar
                        </Button>
                        </Link>
                      </Form.Item> */}

                  {/* <Link href={``}>Registrar</Link> */}
                  {/* </Form>
                  </Col>  */}
                </Row>
              </section>
            </Spin>
          </div>
        </main>
      </div>

      {/* <Modal
        title="Cadastro de Usuário"
        visible={modalChamado}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer={[]}
      >
        <Row {...rowProps}>
          <Col xs={8} sm={8} md={8}>
            <Button
              // type="primary"
              htmlType="submit"
              style={{
                background: "#003a8c",
                color: "#fff",
                width: "100%",
                marginBottom: -50,
              }}
            >
              Chamar Novamente
            </Button>
          </Col>
          <Col xs={8} sm={8} md={8}>
            <Popconfirm
              placement="topRight"
              title={"Confirma o atendimento?"}
              // onConfirm={algoaqui}
              okText="Sim"
              cancelText="Não"
            >
              <Button
                // type="primary"
                htmlType="submit"
                style={{
                  background: "#003a8c",
                  color: "#fff",
                  width: "100%",
                  marginBottom: -50,
                }}
              >
                Atendido
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </Modal> */}
    </div>
  );
};

export default Detentos;
