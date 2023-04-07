import { Dots } from "$/components/dots";
import {
  Button,
  Container,
  Flex,
  Group,
  Image,
  Modal,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCamera,
  IconCloudUpload,
  IconDownload,
  IconPaperclip,
  IconX,
} from "@tabler/icons-react";
import AWS from "aws-sdk";
import { useRef, useState } from "react";

AWS.config.update({
  region: "Seoul",
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  },
});

// import { Dots } from "./Dots";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: rem(120),
    paddingBottom: rem(80),

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("xs")]: {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan("xs")]: {
      height: rem(42),
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  wrapperD: {
    position: "relative",
    marginBottom: rem(30),
    marginTop: rem(60),
  },

  dropzone: {
    borderWidth: rem(1),
    paddingBottom: rem(50),
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  controlD: {
    position: "absolute",
    width: rem(250),
    left: `calc(50% - ${rem(180)})`,
    bottom: rem(-20),
  },
}));

const Home = () => {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);
  const [images, setImages] = useState<any[]>();
  const [objectData, setObjectData] = useState<any>();
  const [opened, { open, close }] = useDisclosure(false);

  const previews = images?.map((file, index) => {
    const imageUrl = URL.createObjectURL(file || "");
    return (
      <Image
        alt="image"
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  const handleSend = () => {
    const rekognition = new AWS.Rekognition();
    const reader = new FileReader();
    const image = images?.[0];
    reader.onload = () => {
      const imageBytes = new Uint8Array(reader.result as ArrayBuffer);
      rekognition.detectLabels(
        {
          Image: {
            Bytes: imageBytes,
          },
        },
        (err, data) => {
          if (err) {
            console.log("eerr", err, err.stack);
          } else {
            console.log(data);
            setObjectData(data);
          }
        }
      );
    };
    reader.readAsArrayBuffer(image);
    console.log(objectData);
  };

  console.log(images);

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Энэ юу вэ? -{" "}
          <Text component="span" className={classes.highlight} inherit>
            Зураг
          </Text>{" "}
          танигч систем
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            Машин сургалт ашиглан мэдэхгүй зүйлээ таниулан англи үгийг нь
            олоорой
          </Text>
        </Container>

        <div className={classes.wrapperD}>
          <Dropzone
            openRef={openRef}
            onDrop={(files) => {
              setImages(files);
              open();
              console.log("files", files);
            }}
            className={classes.dropzone}
            radius="md"
            accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
            // maxSize={2 * 1024}
            maxFiles={1}
          >
            {/* <div style={{ pointerEvents: "none" }}> */}
            <Group position="center">
              <Dropzone.Accept>
                <IconDownload
                  size={rem(50)}
                  color={theme.colors[theme.primaryColor][6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size={rem(50)}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  size={rem(50)}
                  color={
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black
                  }
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
              <Dropzone.Accept>Энд зөөнө үү</Dropzone.Accept>
              <Dropzone.Reject>Зураг биш байна</Dropzone.Reject>
              <Dropzone.Idle>Зураг оруулах</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Оруулах зурагаа ийшээ зөөж авчирна уу?
              <i>.jpg, .png</i> өргөтгөлтэй 2mb-с бага зургаа оруулна уу
            </Text>
            {/* </div> */}
          </Dropzone>
          <Flex className={classes.controlD} gap={16}>
            <Button
              size="md"
              radius="xl"
              onClick={() => openRef.current?.()}
              rightIcon={<IconPaperclip />}
            >
              Зураг сонгох
            </Button>
            <Button
              // className={classes.controlD}
              size="md"
              radius="xl"
              onClick={() => openRef.current?.()}
              rightIcon={<IconCamera />}
            >
              Камер нээх
            </Button>
          </Flex>
        </div>
        <Modal opened={opened} onClose={close} title="Сонгогдсог зураг">
          {previews}
          <Button
            onClick={() => {
              // sendImage(images?.[0]);
              handleSend();
            }}
          >
            Send
          </Button>
        </Modal>
        <div className={classes.wrapper}>
          <b>History</b>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
        </div>
      </div>
    </Container>
  );
};

export default Home;
