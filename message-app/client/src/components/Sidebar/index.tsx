'use client'

import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  FlexProps,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from 'react-icons/fi'
import { IconType } from 'react-icons'

interface LinkItemProps {
  name: string
  icon: IconType
  href: string
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode
  href: string
}
const LinkItems: Array<LinkItemProps> = [
  { href: "/", name: 'Home', icon: FiHome },
  { href: "/feed", name: 'Trending', icon: FiTrendingUp },
  { href: "/feed", name: 'Explore', icon: FiCompass },
  { href: "/profile", name: 'Profile', icon: FiStar },
  { href: "/profile", name: 'Settings', icon: FiSettings },
]

const NavItem = ({ icon, children, href }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        py="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          color: 'white',
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const Sidebar = () => {

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')} pl={4}>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

export default Sidebar